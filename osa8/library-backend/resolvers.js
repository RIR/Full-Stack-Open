require('dotenv').config();
const { UserInputError, AuthenticationError } = require('apollo-server');

// For subscriptions
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const jwt = require('jsonwebtoken');

const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({ ...(args.genre && { genres: { $in: [args.genre] } }) }).populate('author');
      return args.author ? books.filter((book) => book.author.name === args.author) : books;
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const allBooks = await Book.find();
      const genres = [...new Set(allBooks.flatMap((book) => book.genres))];
      return genres;
    },
    me: async (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        const author =
          (await Author.findOne({ name: args.author })) ||
          (await new Author({ name: args.author, born: null, books: [] }).save());

        const book = new Book({ ...args, author });
        const savedBook = await book.save();

        author.books = author.books.concat(savedBook);
        await author.save();

        // Let subscribers know
        pubsub.publish('BOOK_ADDED', { bookAdded: book });

        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        const author = Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true });
        return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      /*
        Notice that the same hard coded password is used for all users
        */
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Author: {
    bookCount: async (root) => root.books.length,
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = resolvers;


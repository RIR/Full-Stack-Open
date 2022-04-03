require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');

const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, published: Int!, author: String!, genres: [String]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({ ...(args.genre && { genres: { $in: [args.genre] } }) }).populate('author');
      return args.author ? books.filter((book) => book.author.name === args.author) : books;
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      const author = await Author.findOne({ name: args.author });

      if (!author) {
        const newAuthor = new Author({ name: args.author, born: null });
        await newAuthor.save();

        book.author = newAuthor;
      } else {
        book.author = author;
      }

      return book.save();
    },
    editAuthor: async (root, args) =>
      Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true }),
  },
  Author: {
    bookCount: async (root) => {
      const allBooks = await Book.find().populate('author');
      const bookCount = allBooks.reduce((count, book) => (book.author.name === root.name ? (count += 1) : count), 0);

      return bookCount;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

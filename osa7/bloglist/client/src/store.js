import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { blogReducer, notificationReducer, currentUserReducer, userReducer } from './reducers';

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  currentUser: currentUserReducer,
  users: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

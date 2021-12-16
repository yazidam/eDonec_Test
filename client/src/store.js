import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import "./bootstrap.min.css";
import { productListReducer } from "./reducers/productReducers";
const reducer = combineReducers({
  productList: productListReducer,
});

const initialState = {};

const middelware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middelware))
);

export default store;

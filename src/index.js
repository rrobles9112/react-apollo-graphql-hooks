import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { ApolloLink, concat } from "apollo-link";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "./store";

const httpLink = new HttpLink({ uri: "https://elenas-athenea-real-staging.herokuapp.com/gql/" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      Authorization: localStorage.getItem("token") ? `Token ${localStorage.getItem("token")}` : null,
    },
  });

  return forward(operation);
});

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: "http://pet-library.moonhighway.com",
//   }),
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  queryDeduplication: true,
});

client.disableNetworkFetches = false;

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <Provider>
        <App />
      </Provider>
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

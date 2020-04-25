import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider} from '@apollo/react-hooks';


import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloLink, from} from 'apollo-link';


const httpLink = createHttpLink({uri: 'http://localhost:4000/graphql'});

const authMiddleware = new ApolloLink((operation, forward) => {
    const {token, refresh} = localStorage;
    operation.setContext({
        headers: {
            authorization: `Bearer ${token}`,
            'x-refresh-token': refresh,
        },
    });
    return forward(operation).map(response => {
        return response;
    });
});

const renewJwtMiddleware = new ApolloLink((operation, forward) => {
    return forward(operation).map(result => {
        const {response} = operation.getContext();
        const newToken = response.headers.get('x-new-token');
        if (newToken) {
            localStorage.token = newToken;
        }

        return result;
    });
});

const client = new ApolloClient({
    link: from([authMiddleware, renewJwtMiddleware, httpLink]),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

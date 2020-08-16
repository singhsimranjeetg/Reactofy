/* eslint-disable comma-dangle */
/* eslint-disable indent-legacy */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';

import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

import App from './App';
// http link will connect our app to our graphql

const httpLink = createHttpLink({
    uri: 'https://reactofy.myshopify.com/api/graphql'
});

// middleware to authenticate  our req.
const middlewareLink = setContext(() => ({
    headers: {
        'X-Shopify-Storefront-Access-Token': '58964ab59d9826578aff422131295fb1'
    }
}));

// client apollo
const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache()

});

// render an app on apollo provider

ReactDOM.render(
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>,
    // eslint-disable-next-line comma-dangle
    document.getElementById('root')
    );


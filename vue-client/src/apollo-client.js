import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
//import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import gql from 'graphql-tag';

let cache = new InMemoryCache();

/*let link = new HttpLink({
	uri: 'http://localhost:4000/'
});*/


let link = new WebSocketLink({
	uri: 'ws://localhost:4000/graphql',
	options: { reconnect: true }
});

let client = new ApolloClient({
	link, cache
});

export { gql, client };

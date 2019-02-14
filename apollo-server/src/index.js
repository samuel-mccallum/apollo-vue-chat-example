const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
	typeDefs: require('./graphql/schema'),
	subscriptions: require('./graphql/subscriptions'),
	resolvers: require('./graphql/resolvers')
});

server.listen({port: 4000}).then((args) => {
	console.log(`Server ready at ${args.url}`);
	console.log(`Subscriptions server at ${args.subscriptionsUrl}`);
});

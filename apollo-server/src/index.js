const {ApolloServer, gql, PubSub} = require('apollo-server');

const MOTD_CHANGED = 'MOTD_CHANGED';

const pubsub = new PubSub();

let motd = 'Messege of the day';

const typeDefs = gql`
type Query {
	motd: String
}
type Subscription {
	motdChanged: String
}
type Mutation {
	changeMotd(motd: String): String
}
`;

const resolvers = {
	Query: {
		motd: (parent, args, context, info) => {
			return motd;
		}
	},
	Subscription: {
		motdChanged: {
			subscribe: () => {
				return pubsub.asyncIterator(MOTD_CHANGED);
			},
			resolve: (parent, args, context, info) => {
				console.log(parent, args);
				if (parent.motd) {
					return parent.motd;
				} else {
					return 'idk';
				}
			}
		}
	},
	Mutation: {
		changeMotd (parent, args, context, info) {
			motd = args.motd;
			pubsub.publish(MOTD_CHANGED, {motd});
			return motd;
		}
	}
};

const subscriptions = {
	onConnect: (params, socket) => {
		console.log('Web socket connected.');
		//console.log('Socket connected!', params, socket);
	}
};

const server = new ApolloServer({
	typeDefs,
	subscriptions,
	resolvers
});

server.listen({port: 4000}).then((args) => {
	console.log(`Server ready at ${args.url}`);
	console.log(`Subscriptions server at ${args.subscriptionsUrl}`);
});

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const NEW_MESSAGE = 'NEW_MESSAGE';
const NEW_USER = 'NEW_USER';

let users = [];
let messages = [];

const GenerateId = (function () {
	let cursor = 1;
	return function () {
		return cursor++;
	};
})();

const resolvers = {
	Query: {
		messages: (parent, args, context, info) => {
			return messages;
		},
		users: (parent, args, context, info) => {
			return users;
		}
	},
	Subscription: {
		newMessages: {
			subscribe: () => {
				return pubsub.asyncIterator(NEW_MESSAGE);
			},
			resolve: (result, variables) => {
				console.log('New Message Result', result);
				result.from = resolvers.Message.from(result);
				return result;
			}
		},
		newUsers: {
			subscribe: () => {
				return pubsub.asyncIterator(NEW_USER);
			},
			resolve: (result, variables) => {
				return result;
			}
		}
	},
	Mutation: {
		newUser(parent, args, context, info) {
			let user = {
				id: GenerateId(),
				nickname: args.nickname
			};
			users.push(user);
			pubsub.publish(NEW_USER, user);
			return user;
		},
		newMessage (parent, args, context, info) {
			let message = {
				id: GenerateId(),
				msg: args.msg,
				userId: args.userId
			};

			messages.push(message);
			pubsub.publish(NEW_MESSAGE, message);
			return message;
		}
	},
	Message: {
		from: (message, args, context, info) => {
			let user = users.find(({ id }) => +id === +message.userId);
			if (!user) {
				console.error("User not found by ID", user);
			}
			return user;
		}
	}
};

module.exports = resolvers;

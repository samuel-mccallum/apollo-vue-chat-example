const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
	messages: [Message]!
	users: [User]!
}

type Message {
	id: ID!
	msg: String!
	from: User
}

type User {
	id: ID!
	nickname: String!
}

type Subscription {
	newMessages: Message!
	newUsers: User!
}

type Mutation {
	newMessage(userId: ID!, msg: String!): Message
	newUser(nickname: String!): User
}
`;

module.exports = typeDefs;

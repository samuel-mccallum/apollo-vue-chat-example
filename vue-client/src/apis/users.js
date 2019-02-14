import { gql, client } from '../apollo-client';

const CREATE = gql`
mutation createNewUser($nickname: String!) {
	user: newUser (nickname: $nickname) {
		id
		nickname
	}
}
`;

const FIND_ALL = gql`
query {
	users {
		id
		nickname
	}
}
`;

const SUBSCRIBE_TO_NEW = gql`
subscription onNewUser {
	user: newUsers {
		id
		nickname
	}
}
`;

export default {
	async create ({ nickname }) {
		return client.mutate({
			mutation: CREATE,
			variables: {nickname: nickname}
		});
	},

	async find ({ id }) {

	},

	async findAll () {
		return client.query({
			query: FIND_ALL
		});
	},

	subscribeToNew (callback) {
		let subscription = client.subscribe({
			query: SUBSCRIBE_TO_NEW
		});

		subscription.subscribe({
			next: callback
		});
	}
};

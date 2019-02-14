<template>
	<div class="chat container">
		<header>
			<div>You are chatting as {{ user.nickname }}</div>
		</header>

		<div class="row">
			<div class="users list">
				<h4>Users</h4>
					<div v-for="user in users">
						{{ user.nickname }}
					</div>
			</div>

			<div class="messages list">
				<h4>Messages</h4>
				<div v-for="message in messages">
					<span class="from">{{ message.from.nickname }}:</span>
					<span class="msg">{{ message.msg }}</span>
				</div>
			</div>
		</div>

		<div class="chat input">
			<input type="text" v-model="input" placeholder="Send a message" @keyup.enter="onEnter" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'ApolloChat',
	data: () => ({
		input: ''
	}),
	computed: mapState(['users','messages','user']),
	mounted () {
		this.$store.dispatch('load messages');
		this.$store.dispatch('load users');
		this.$store.dispatch('subscribe to messages');
		this.$store.dispatch('subscribe to users');
	},
	methods: {
		onEnter () {
			this.$store.dispatch('post message', { msg: this.input });
			this.input = '';
		}
	}
};
</script>

<style lang="scss">
.chat.container {
	//height: 100vh;
	position: absolute;

	bottom: 0;
	right: 0;

	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	header {
		height: 40px;
		width: 100%;

		div {
			margin: 10px;
			font-size: 20px;
			font-weight: bold;
		}
	}

	.row {
		height: calc(100vh - 80px);
		display: flex;
		flex-direction: row;
		flex: 1;
		.users {
			padding: 0 5px 5px 5px;
			min-width: 100px;
		  :not(h4) {
		  	font-style:italic;
		  }
		}

		.messages {
			flex: 1;

			div {
				padding: 5px;
				.from {
					margin-right: 10px;
					font-weight: bold;
				}
			}
		}
	}

	.chat.input {
		height: 40px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: azure;
	}
}
</style>

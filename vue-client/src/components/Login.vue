<template>
	<div class="login container">
		<h3>Enter a Nickname to star chatting</h3>
		<input type="text" placeholder="Enter Nickname" v-model="nickname" @keyup.enter="onEnter" />
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data: () => ({
			nickname: ''
		}),
		methods: {
			onEnter () {
				if (this.nickname.length) {
					this.$store.dispatch('create user', { nickname: this.nickname });
				}
				this.nickname = '';
			}
		}
	};
</script>

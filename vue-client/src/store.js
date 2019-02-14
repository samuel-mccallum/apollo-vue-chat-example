import Vue from 'vue'
import Vuex from 'vuex'
import MessagesApi from './apis/messages';
import UsersApi from './apis/users';

Vue.use(Vuex)

let currentUser = {
	id: null,
	nickname: ''
};

if (sessionStorage.getItem('currentUser')) {
	currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
}

export default new Vuex.Store({
  state: {
  	user: currentUser,
  	messages: [],
  	users: []
  },
  mutations: {
  	'new message': (state, args) => {
  		state.messages.push(args);
  	},
  	'new user': (state, args) => {
  		state.users.push(args);
  	},
  	'current user': (state, args) => {
  		state.user = args;
  	}
  },
  actions: {
  	'create user': (context, args) => {
  		UsersApi.create(args).then((result) => {
  			let user = result.data.user;
  			//context.commit('new user', user);

  			sessionStorage.setItem('currentUser', JSON.stringify(
  				Object.assign({}, user)
  			));

  			context.commit('current user', Object.assign({}, user));
  		});
  	},
  	'post message': (context, { msg }) => {
  		MessagesApi.create({
  			userId: context.state.user.id,
  			msg: msg
  		}).then((result) => {
	  		let message = result.data.message;
  			//context.commit('new message', message);
  		});
  	},
  	'load users': (context) => {
  		UsersApi.findAll().then((response) => {
  			if (response.data) {
  				response.data.users.forEach(
  					user => context.commit('new user', user)
					);
  			} else {
  				console.error('No response data', response);
  			}
  		});
  	},
  	'load messages': (context) => {
  		MessagesApi.findAll().then((response) => {
  			if (response.data) {
  				response.data.messages.forEach(
  					message => context.commit('new message', message)
					);
  			} else {
  				console.error('No response data', response);
  			}
  		});
  	},
  	'subscribe to users': (context) => {
  		UsersApi.subscribeToNew((response) => {
  			let user = response.data.user;
  			context.commit('new user', Object.assign({}, user));
  		});
  	},
  	'subscribe to messages': (context) => {
  		MessagesApi.subscribeToNew((response) => {
  			let message = response.data.message;
  			context.commit('new message', Object.assign({}, message));
  		});
  	}
  }
})

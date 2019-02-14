const subscriptions = {
	onConnect: (params, socket) => {
		console.log('Web socket connected.');
	}
};

module.exports = subscriptions;

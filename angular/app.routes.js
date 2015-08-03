angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'example.html',
			controller: 'mainCtrl',
			data: {
				requireLogin: false
			}
		});
});
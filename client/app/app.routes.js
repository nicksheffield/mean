angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'app/views/example.html',
			controller: 'mainCtrl',
			data: {
				requireLogin: false
			}
		});
});
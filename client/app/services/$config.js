angular.module('app.services')

.factory('$config', [
	function(){
		var service = {
			api_url:    'http://localhost:8000/api/',
			socket_url: 'http://localhost:8001'
		};

		return service;
	}
]);
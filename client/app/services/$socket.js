angular.module('app.services', [])

.factory('$socket', ['$rootScope', '$config',
	function($rootScope, $config) {
		var socket = io.connect($config.socket_url);

		var service = {
			id: socket.id,
			on: function(eventName, callback) {
				socket.on(eventName, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						callback.apply(socket, args);
					});
				});
			},
			emit: function(eventName, data, callback) {
				socket.emit(eventName, data, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				});
			}
		};
		
		return service;
	}
]);
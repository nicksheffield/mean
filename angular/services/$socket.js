angular.module('app.services')

.factory('$socket', function($rootScope, $config) {
	var socket = io.connect($config.socketURL);

	var service = {
		id: socket.id,
		on(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit(eventName, data, callback) {
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
});
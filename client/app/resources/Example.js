angular.module('app.models')

.factory('Example', ['$resource',
	function($resource) {
		var url = '/api/example/:id';

		var defaults = {
			'id': '@id'
		};

		var methods = {
			update: {
				method: 'PUT'
			}
		};

		return $resource(url, defaults, methods);
	}
]);
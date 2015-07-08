angular.module('app.models')

.factory('Example', ['$resource', '$congif',
	function($resource, $config) {
		var url = $config.api_url+'/example/:id';

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
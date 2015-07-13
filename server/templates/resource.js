angular.module('app.models')

.factory('<%- capitalizedName %>', ['$resource', '$config',
	function($resource, $config) {
		var url = $config.api_url+'/<%- name %>/:id';

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
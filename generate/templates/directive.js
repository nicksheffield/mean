angular.module('app.directives')

.directive('<%= name %>', function() {
	function link(scope, el, attrs){
		
	}

	return {
		restrict: 'EA',
		replace: false,
		transclude: false,
		link: link,
		scope: {
			'<%= name %>': '='
		}
	};
});
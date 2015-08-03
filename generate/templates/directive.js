angular.module('app.directives')

.directive('<%- name %>', () =>{
	function link(scope, el, attrs){
		
	}

	return {
		restrict: 'EA',
		replace: false,
		transclude: false,
		link,
		scope: {
			'<%- name %>': '='
		}
	};
});
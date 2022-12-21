(function (angular) {
    var alertDirective = angular.module('directive.alert', []);

    // this could be merged with $dialog
    alertDirective.service('$alerts', ['$rootScope', '$q', function ($rootScope, $q) {
        var _this = this;
        var broadcast = function (topic, clazz, data) {
            var d = $q.defer();
            $rootScope.$broadcast(topic, angular.extend({clazz: clazz, deferred: d}, data));
            return d.promise;
        };

        var createFunc = function (type) {
            return function (topic, title, message) {
                return broadcast(topic, 'alert-' + type, {title: title, message: message});
            };
        };
        angular.forEach(['info', 'warn', 'error', 'success'], function (type) {
            _this[type] = createFunc(type);
        });
    }]);

    alertDirective.directive('alerts', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            template: '<div ng-repeat="alert in _alerts" class="alert alert-block transition {{alert.clazz}}">' +
                '<button type="button" class="close" ng-click="_close($index)">&times;</button>' +
                '<h4>{{alert.title}}</h4>' +
                '{{alert.message}}' +
                '</div>',
            link: function (scope, el, attrs) {
                var alertChannel = attrs.topic || "alertChannel";
                scope._alerts = [];
                scope._close = function (index) {
                    scope._alerts[index].deferred.resolve();
                    scope._alerts.splice(index, 1);
                };

                $rootScope.$on(alertChannel, function (event, data) {

                    var timeout = data.timeout || attrs.timeout;
                    scope._alerts.push(data);
                    if (timeout) {
                        $timeout(function () {
                            scope._close(scope._alerts.indexOf(data));
                        }, timeout);
                    }
                });
            }
        };
    }]);

})(window.angular);
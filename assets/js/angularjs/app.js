var app = angular.module('myApp', ['ngTable', 'oitozero.ngSweetAlert', 'ngRoute']);


app.value('serverURL', 'http://localhost:9192/userMgt/');
app.value('uiURL','http://localhost/userMGtUI/');

// .config(function ($httpProvider) {
//     $httpProvider.interceptors.push(function ($q) {
//         return {
//             responseError: function (rejection) {
//                 if (rejection.status <= 0) {
//                     $("#serverErrorModal").modal("show");
//                     return;
//                 }
//                 return $q.reject(rejection);
//             }
//         };
//     });
// })

var fullURL = window.location.href;
var arr = fullURL.split("/");
var protocol = arr[0];

var hostPort = arr[2].split(":");
var host = hostPort[0];
var port = hostPort[1];

app.urlUI = protocol + "//" + host + ":" + port + "/";
app.urlServer = protocol + "//" + host + ":" + "8081" + "/";



app.directive("alertMessage", function ($compile) {
    return {
        restrict: "E",
        scope: {
            alert: "="
        },
        link: function (scope, element) {
            scope.$watch('alert', function () {
                updateAlert();
            });

            scope.close = function () {
                scope.alert = null;
            }

            function updateAlert() {
                if (scope.alert.type == 'error') {
                    scope.alert.type = 'danger';
                }
                var html = "";

                if (scope.alert) {
                    var icon = null;

                    switch (scope.alert.type) {
                        case 'success': {
                            icon = 'ok-sign';
                        } break;
                        case 'warning': {
                            icon = 'exclamation-sign';
                        } break;
                        case 'info': {
                            icon = 'info-sign';
                        } break;
                        case 'danger': {
                            icon = 'remove-sign';
                        } break;
                    }

                    html = "<div class='alert alert-" + scope.alert.type + " fade show' role='alert'>";

                    if (scope.alert.closable) {
                        html += "<button type='button' class='close' data-dismiss='alert' ng-click='close()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
                    }

                    if (icon) {
                        html += "<span style='padding-right: 5px;' class='glyphicon glyphicon-" + icon + "' aria-hidden='true'></span>";
                    }

                    html += scope.alert.text;
                    html += "</div>";
                }

                var newElement = angular.element(html);
                var compiledElement = $compile(newElement)(scope);

                element.html(compiledElement);

                if (scope.alert && scope.alert.delay > 0) {
                    setTimeout(function () {
                        scope.alert = null;
                        scope.$apply();
                    }, scope.alert.delay * 1000);
                }
            }
        }
    }
});

app.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        compile: function () {
            return {
                pre: function (scope, element, attrs, ngModelCtrl) {
                    var format, dateObj;
                    format = (!attrs.dpFormat) ? 'd/m/yyyy' : attrs.dpFormat;
                    if (!attrs.initDate && !attrs.dpFormat) {
                        // If there is no initDate attribute than we will get todays date as the default
                        dateObj = new Date();
                        scope[attrs.ngModel] = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
                    } else if (!attrs.initDate) {
                        // Otherwise set as the init date
                        scope[attrs.ngModel] = attrs.initDate;
                    } else {
                        // I could put some complex logic that changes the order of the date string I
                        // create from the dateObj based on the format, but I'll leave that for now
                        // Or I could switch case and limit the types of formats...
                    }
                    // Initialize the date-picker
                    $(element).datepicker({
                        format: format,
                    }).on('changeDate', function (ev) {
                        // To me this looks cleaner than adding $apply(); after everything.
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(ev.format(format));
                        });
                    });
                }
            }
        }
    }
});

app.directive('fileModel', [ '$parse', function($parse) {
    return {
        restrict : 'A',
        link : function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
} ]);

app.config(function($routeProvider) {
    $routeProvider       
    .when("/home", {
        templateUrl : "home.html"
    })
    .when("/userList", {
        templateUrl : "users/users_list.html",
        controller : "userListCtrl"
    })
    .when("/appliedUsers",{
        templateUrl : "users/applied_users.html",
        controller : "appliedUserCtrl"
    })
    ;
});
app.controller('registerCtrl', function (serverURL, uiURL, $scope, $http, $window, SweetAlert) {

    $scope.message = function (title, msg, type) {
        SweetAlert.swal(title, msg, type);
    }
    $scope.urlServer = "";
    $scope.urlUI = "";
    $scope.getServerURL = function () {
        var fullURL = window.location.href;
        var arr = fullURL.split("/");
        var protocol = arr[0];

        var hostPort = arr[2].split(":");
        var host = hostPort[0];
        var port = hostPort[1];
        $scope.urlServer = serverURL;//protocol + "//" + host + ":" + "8081" + "/";
    }

    $scope.getUiURL = function () {
        var fullURL = window.location.href;
        var arr = fullURL.split("/");
        var protocol = arr[0];

        var hostPort = arr[2].split(":");
        var host = hostPort[0];
        var port = hostPort[1];
        if(!angular.isUndefined(protocol)){
            $scope.urlUI += protocol + "//";
        }
        if(!angular.isUndefined(host)){
            $scope.urlUI += host;
        }
        if(!angular.isUndefined(port)){
            $scope.urlUI += ":" + port + "/";
        }else{
            $scope.urlUI += "/";
        }
        $scope.urlUI = uiURL;
    }

    $scope.getServerURL();
    $scope.getUiURL();
    $scope.goToLogin = function () {
        $window.location.href = $scope.urlUI + 'index.html';
    };
    $scope.getUserInfo = function (userId, userName) {

        if (angular.isUndefined(userId)) {
            return;
        }

        $http.post($scope.urlServer + "api/auth/getUserInfo/" + $scope.userId)
            .then(
                function (response) {
                    console.log(response.data);
                    if (angular.equals(response.data.message, 'ERROR')) {
                        $scope.message('!ERROR!', 'User ID Not Found', 'error');
                        $scope.userName = '';
                        $scope.designation = '';
                        $scope.department = '';
                        $scope.reportingTo = '';
                        return;
                    }
                    $scope.userName = response.data.userInfo.userName;
                    $scope.designation = response.data.userInfo.designation;
                    $scope.department = response.data.userInfo.department;
                    $scope.reportingTo = response.data.userInfo.reportingTo;
                },
                function (errResponse) {
                    $scope.message('!ERROR!', 'Error While Retriving User Info', 'error');
                    $scope.userName = '';
                    $scope.designation = '';
                    $scope.department = '';
                    $scope.reportingTo = '';
                }
            );
    };

    $scope.registerUser = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json'
            }
        }
        $scope.register = {};
        $scope.register.userId = $scope.userId;
        $scope.register.userName = $scope.userName;
        $scope.register.designation = $scope.designation;
        $scope.register.department = $scope.department;
        $scope.register.reportingTo = $scope.reportingTo;
        $scope.register.extNo = $scope.extNo;
        $scope.register.password = $scope.password;
        console.log($scope.register);
        $http.post($scope.urlServer + "api/auth/registerNewUser/", $scope.register, config)
            .then(
                function (response) {
                    console.log(response);

                    switch (response.data.message) {
                        case 'SUCCESS':
                            $scope.message("SUCCESS", "User Created Successfully", "success");
                            $scope.goToLogin();
                            break;
                        case 'EXIST':
                            $scope.message("WARNING", "User Already Exist", "warning");
                            break;
                        case 'ERROR':
                            $scope.message("!ERROR!", "Error While Creating User", "error");
                            break;
                        default:
                            $scope.message("!INFO!", "Unknown Error", "info");
                            break;
                    }


                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Failed to Create User", "error");
                }
            );
    };


});
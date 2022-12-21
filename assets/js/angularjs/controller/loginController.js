app.controller('loginCtrl', function (serverURL, uiURL, $scope, $http, $window, SweetAlert) {


    $scope.message = function (title, msg, type) {
        SweetAlert.swal(title, msg, type);
    }

    $scope.urlServer = "";
    $scope.urlUI = "";
    $scope.getServerURL = function () {
        var fullURL = window.location.href;
        var arr = fullURL.split("/");
        var protocol = arr[0];
console.log(serverURL);
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

    $scope.getData = function () {
        $http.get($scope.urlServer + "api/auth/authenticate/")
            .then(
                function (response) {
                    console.log(response.data);
                },
                function (errResponse) {

                }
            );
    };

    $scope.doLogin = function () {
        var userName = $scope.user.userName;
        var password = $scope.user.password;
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json'
            }
        }

        var data = {
            "userId": $scope.user.userName,
            "password": $scope.user.password
        }
        $http.post($scope.urlServer + "api/auth/login/", data, config).then(
            function (response) {
                console.log(response.data);
                if (response.data.jwtToken == null || response.data.user == null) {
                    $scope.message("!ERROR!", response.data.message, "error");
                    return;
                }
                $scope.userName = response.data.user.userName;
                $window.localStorage.setItem("employeeName", response.data.user.employeeName);
                $window.localStorage.setItem("token", response.data.jwtToken);
                $window.localStorage.setItem("userId", response.data.user.userId);
                $window.localStorage.setItem("userRole", response.data.user.roles[0].roleName);
                $window.location.href = uiURL + 'dashboard.html';
            },
            function (errResponse) {
                console.log(errResponse);
                if (errResponse.status <= 0) {
                    $scope.message("!ERROR!", "Server Not Responding. Please try again after sometime or contact: \"webdeveloper@apexholidings.com\"", "error");
                }
            }
        );
    }

});
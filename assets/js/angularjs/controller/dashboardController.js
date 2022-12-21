app.controller('dashCtrl', function (serverURL, uiURL, $scope, $window) {

    $scope.getJWTToken = function () {

        // console.log($window.sessionStorage.getItem("token"));
        $scope.token = $window.localStorage.getItem("token");
        $scope.userId = $window.localStorage.getItem("userId");
        $scope.userRole = $window.localStorage.getItem("userRole");
        $scope.employeeName = $window.localStorage.getItem("employeeName");
        // $scope.loc1 = $location.absurl();
        // console.log($scope.loc1);

    }

    $scope.checkSessionData = function () {
        $scope.getJWTToken();
        if ($scope.token == '' || $scope.userId == '' || $scope.userRole == '' || $scope.token == null || $scope.userId == null || $scope.userRole == null) {
            // console.log("Invalid User Session.");
            $("#invalidSession").modal("show");
        }
    }

    $scope.logout = function () {
        $window.sessionStorage.clear();
        $window.location.href = uiURL + 'index.html';
    }

    $scope.goToLogin = function () {
        $window.location.href = uiURL + 'index.html';
    }

});
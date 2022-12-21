app.controller('unionCtrl', function (serverURL, uiURL, $scope, $http, ngTableParams, $window, SweetAlert) {

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
        if (!angular.isUndefined(protocol)) {
            $scope.urlUI += protocol + "//";
        }
        if (!angular.isUndefined(host)) {
            $scope.urlUI += host;
        }
        if (!angular.isUndefined(port)) {
            $scope.urlUI += ":" + port + "/";
        } else {
            $scope.urlUI += "/";
        }
        $scope.urlUI = uiURL;
    }

    $scope.getServerURL();
    $scope.getUiURL();

    $scope.message = function (title, msg, type) {
        SweetAlert.swal(title, msg, type);
    }

    $scope.token = '';
    $scope.userName = '';
    $scope.userRole = '';
    $scope.getJWTToken = function () {

        // console.log($window.sessionStorage.getItem("token"));
        $scope.token = $window.localStorage.getItem("token");
        $scope.userName = $window.localStorage.getItem("userName");
        $scope.userRole = $window.localStorage.getItem("userRole");
        // $scope.loc1 = $location.absurl();
        // console.log($scope.loc1);

    }

    $scope.loadAllUnions = function () {

        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }
        $http.get($scope.urlServer + "api/masterData/getAllUnion", config).then(
                function (response) {
                    console.log(response);
                    var data = response.data;
                    $scope.tableParams = new ngTableParams({
                        page: 1, // show first page
                        count: 5           // count per page
                    }, {
                        total: data.length, // length of data
                        dataset: data
                    });
                },
                function (errResponse) {

                }
        );
    }

    $scope.loadAllDivisions = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.get($scope.urlServer + "api/masterData/getAllDivision", config).then(
                function (response) {
                    $scope.divList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    }
    
    $scope.loadAllDistricts = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.get($scope.urlServer + "api/masterData/getAllDistrict", config).then(
                function (response) {
                    $scope.disList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    }
    
    $scope.loadDistrictByDivision = function(div){
        console.log(div);
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.get($scope.urlServer + "api/masterData/getDistrictByDivision" + "/"+div.id, config).then(
                function (response) {
                    $scope.disList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    }
    
    $scope.loadUpazilaByDivAndDis = function(dis){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }
        
        $http.get($scope.urlServer + "api/masterData/getUpazilaByDivIdAndDisId/" + dis.div.id + "/" + dis.id, config).then(
            function(response){
                $scope.zilaList = response.data;
            },
            function(errResponse){
                    console.log(errResponse);
            }
        );
    }

    $scope.checkSessionData = function () {
        $scope.getJWTToken();
        if ($scope.token == '' || $scope.userName == '' || $scope.userRole == '' || $scope.token == null || $scope.userName == null || $scope.userRole == null) {
            // console.log("Invalid User Session.");
            $("#invalidSession").modal("show");
        } else {
            $scope.loadInitData();
        }
    }

    $scope.logout = function () {
        $window.sessionStorage.clear();
        $window.location.href = $scope.urlUI + 'index.html';
    }

    $scope.goToLogin = function () {
        $window.location.href = $scope.urlUI + 'index.html';
    }

    $scope.loadInitData = function () {
        $scope.loadAllUnions();
//        $scope.loadAllUpazilas();
//        $scope.loadAllDistricts();
        $scope.loadAllDivisions();
    }

    $scope.addUnion = function (union, div, dis, zila) {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        union.status = 'active';
        union.div = div;
        union.dis = dis;
        union.zila = zila;

        $http.post($scope.urlServer + "api/masterData/addUnion", union, config).then(
                function (response) {
                    console.log(response);
                    switch (response.data.messageType) {
                        case 'success':
                            $scope.message("SUCCESS", response.data.message, "success");
                            $("#addOrEditUnion").modal("hide");
                            $scope.loadAllUnions();
                            break;
                        case 'error':
                            $scope.message("!ERROR!", response.data.message, "error");
                            break;
                        default:
                            $scope.message("WARNING", "Unknown Error", "warning");
                            break;
                    }
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    }

    $scope.editUnion = function (union) {
        $scope.union = union;
//        $scope.loadDistrictByDivision(zila.div);
        
    }
    $scope.addUnionClick = function () {
        $scope.union = {};
    }

    $scope.updateUnion = function (union) {
        
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.put($scope.urlServer + "api/masterData/updateUnion", union, config).then(
                function (response) {
                    console.log(response);
                    switch (response.data.messageType) {
                        case 'success':
                            $scope.message("SUCCESS", response.data.message, "success");
                            $('#addOrEditUnion').modal('hide');
                            $scope.loadAllUnions();
                            break;
                        case 'error':
                            $scope.message("!ERROR!", response.data.message, "error");
                            break;
                        default:
                            $scope.message("WARNING", "Unknown Error", "warning");
                            break;
                    }
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "warning");
                    $('#addOrEditUnion').modal('hide');
                }
        );
    }

});
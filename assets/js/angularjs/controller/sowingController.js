app.controller('sowingCtrl', function (serverURL, uiURL, $scope, $http, ngTableParams, $window, SweetAlert) {

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

    $scope.message = function (title, msg, type) {
        SweetAlert.swal(title, msg, type);
    }

    $scope.token = '';
    $scope.userName = '';
    $scope.userRole = '';
    $scope.getJWTToken = function () {

        // console.log($window.sessionStorage.getItem("token"));
        $scope.token = $window.sessionStorage.getItem("token");
        $scope.userName = $window.sessionStorage.getItem("userName");
        $scope.userRole = $window.sessionStorage.getItem("userRole");
        // $scope.loc1 = $location.absurl();
        // console.log($scope.loc1);

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
    };

    $scope.goToLogin = function () {
        $window.location.href = $scope.urlUI + 'index.html';
    };
    
    $scope.loadAllSowingDetail = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/sowing/getAllSowingCrops", config).then(
                function(response){
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
                function(errResponse){
                    console.log(errResponse);
                }
        );
    }


    
    $scope.loadAllFarmerList = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.get($scope.urlServer + "api/farmer/getALLActiveFarmer", config).then(
                function(response){
                    $scope.farmerList = response.data;
                },
                function(errResponse){
                    console.log(errResponse);
                }
        );
    };
    
    $scope.loadAllFarmDetail = function(){
         var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.get($scope.urlServer + "api/farmDetail/getAllFarmDetail", config).then(
                function(response){
                    $scope.farmDetailList = response.data;
                },
                function(errResponse){
                    console.log(errResponse);
                }
        );
    };
    
    $scope.loadAllSeasonList = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.get($scope.urlServer + "api/masterData/getAllActiveSeasonList", config).then(
                function(response){
                    $scope.seasonList = response.data;
                },
                function(errResponse){
                    console.log(errResponse);
                }
        );
    };
    

    
    $scope.loadAllCrops = function(){
      var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.get($scope.urlServer + "api/masterData/getAllCrops", config).then(
                function(response){
                    $scope.cropList = response.data;
                },
                function(errResponse){
                    console.log(errResponse);
                }
        );
    };
    
    $scope.loadCropsVarietyByCropName = function(cropName){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/masterData/getCropVarietyByCropName/"+cropName, config).then(
                function(response){
                    $scope.cropVarietyList =  response.data;
                },
                function(errResponse){
                    console.log(errResponse);
                }
        );
    };

    $scope.loadInitData = function () {
        $scope.loadAllSowingDetail();
        $scope.loadAllFarmerList();
        $scope.loadAllFarmDetail();
        $scope.loadAllSeasonList();
        $scope.loadAllCrops();
        
    };
    
    $scope.addSowingDetailClick = function(){
        $scope.sw = {};
    };
    
    
    $scope.cropInfoList = [];
    $scope.ciData = {
        "crop": null,
        "cropType": null,
        "cropVariety": null,
        "remarks": null
    };
    $scope.addCropInfo = function(ci, cropType){
        $scope.ciData.crop = ci.crop;
        $scope.ciData.cropType = cropType;
        $scope.ciData.cropVariety = ci.cropVariety;
        $scope.ciData.remarks = ci.remarks;
        $scope.cropInfoList.push($scope.ciData);
        
        
    };
    
    $scope.removeRow = function (index) {
        var name = $scope.cropInfoList[index].crop.cropName;
        if ($window.confirm("Do you want to delete: " + name)) {
            $scope.cropInfoList.splice(index, 1);
        }
    };
    
    $scope.addSowingDetail = function(sw){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $scope.sw.sowingDate = new Date(sw.sowingDate);
        $scope.sw.estHarvestDate = new Date(sw.estHarvestDate);
        $scope.sowingData = {
            "sowingFarmLandPlanning": null,
            "sowingFarmLandPlanningCropList": null
        };
        $scope.sowingData.sowingFarmLandPlanning = $scope.sw;
        $scope.sowingData.sowingFarmLandPlanningCropList = $scope.cropInfoList;
        console.log($scope.sowingData);
        $http.post($scope.urlServer + "api/sowing/addSowingPlanning", $scope.sowingData, config).then(
            function(response){
                switch(response.data.messageType){
                    case 'success':
                        $scope.message("SUCCESS", response.data.message, "success");
                        $("#addOrEditPlanningDetail").modal("hide");
                        $scope.pd = "";
                        $scope.loadAllPlanningDetail();
                        break;
                    case 'error':
                        $scope.message("!ERROR!", response.data.message, "error");
                        break;
                    default:
                        $scope.message("!ERROR!", "Unknwon Error", "error");
                        break;
                }
            },
            function(errResponse){
                console.log(errResponse);
            }
        );
    };

    $scope.editPlanningDetail = function(pd){
        $scope.pd = pd;
        $scope.pd.sowingDate = new Date(pd.sowingDate);
        $scope.pd.harvestDate = new Date(pd.harvestDate);
    };
    
    $scope.updatePlanningDetail = function(pd){
        $scope.pd = pd;
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.put($scope.urlServer + "api/planningDetail/updatePlaningDetail", $scope.pd, config).then(
                function(response){
                    switch(response.data.messageType){
                        case "success":
                            $scope.message("SUCCESS", response.data.message, "success");
                            $("#addOrEditPlanningDetail").modal('hide');
                            $scope.pd = "";
                            $scope.loadAllPlanningDetail();
                            break;
                        case "error":
                            $scope.message("!ERROR!", response.data.message, "error");
                            break;
                        default:
                            $scope.message("!ERROR!", "Ünknown Error", "error");
                            break;
                    }
                },
                function(errResponse){
                    console.log(errResponse);
                }
        );
    };

});
app.controller('farmLandController', function(serverURL, uiURL, $scope, $http, ngTableParams, $window, SweetAlert){
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
    };

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
    };
    
    $scope.getSessionConfig = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
    }

    $scope.getServerURL();
    $scope.getUiURL();

    $scope.message = function (title, msg, type) {
        SweetAlert.swal(title, msg, type);
    };

    $scope.token = '';
    $scope.userName = '';
    $scope.userRole = '';
    $scope.getJWTToken = function () {

        // console.log($window.sessionStorage.getItem("token"));
        $scope.token = $window.sessionStorage.getItem("token");
        $scope.userName = $window.sessionStorage.getItem("userName");
        $scope.userRole = $window.sessionStorage.getItem("userRole");

    };
    
    $scope.checkSessionData = function () {
        $scope.getJWTToken();
        if ($scope.token == '' || $scope.userName == '' || $scope.userRole == '' || $scope.token == null || $scope.userName == null || $scope.userRole == null) {
            // console.log("Invalid User Session.");
            $("#invalidSession").modal("show");
        } else {
            $scope.loadInitData();
        }
    };
    
    $scope.loadTopography = function(){
      var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/topography", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.topographys = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        );  
    };
    
    
    $scope.loadOwnership = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/ownership", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.ownerships = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        ); 
        
    };
    
    $scope.loadCultivacationType = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/cultivationType", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.cultivationTypes = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        ); 
    };
    
    $scope.loadFarmLandType = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/farmLandType", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.farmLandTypes = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        );
    };
    $scope.farmersList = [];
    $scope.farmer1= {
        id: 0,
        farmerName: null
    };
    $scope.loadFarmerName = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/farmer/getAllFarmers", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.farmers = response.data;
                    angular.forEach($scope.farmers, function(value, key){
                        if(value !== null){
                            console.log(value);
                            $scope.farmer1.id = value.farmerDetail.id;
                            $scope.farmer1.farmerName = value.farmerDetail.farmerName;
                            $scope.farmersList.push($scope.farmer1);
                            $scope.farmer1= {
                                id: 0,
                                farmerName: null
                            };
                        }
                    });
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        );
    };
    
    $scope.loadReportingOfficeName = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/reportingOffice/getAllReportingOffice", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.reportingOfficeNames = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error. loadReportingOfficeName", "error");
                }
        );
    };
    
    $scope.loadReportingFieldOfficerName = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/reportingFieldOfficer/getAllReportingFieldOfficer", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.reportingFieldOfficerNames = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error. loadReportingFieldOfficerName", "error");
                }
        );
    };
    
    $scope.loadInitData = function(){
        $scope.loadFarmerName();
        $scope.loadReportingOfficeName();
        $scope.loadReportingFieldOfficerName();
        $scope.loadFarmLandType();
        $scope.loadCultivacationType();
        $scope.loadOwnership();
        $scope.loadTopography();
        $scope.getAllFarmLand();
    };
    
    $scope.logout = function () {
        $window.sessionStorage.clear();
        $window.location.href = $scope.urlUI + 'index.html';
    };

    $scope.goToLogin = function () {
        $window.location.href = $scope.urlUI + 'index.html';
    };
    
    
    
    $scope.landTypes = [
        {
            "sn": 0,
            "regNo": null,
            "farmLandType": null,
            "cultivationType": null,
            "ownership": null,
            "topography": null,
            "landArea": null,
            "lat": null,
            "lon": null,
            "remarks": null
        }
    ];
    
    $scope.addLandType = function(){
        var landType = {
            sn: $scope.landTypes.length + 1,
            regNo: $scope.regNo,
            farmLandType: $scope.farmLandType,
            cultivationType: $scope.cultivationType,
            ownership: $scope.ownership,
            topography: $scope.topography,
            landArea: $scope.landArea,
            lat: $scope.lat,
            lon: $scope.lon,
            remarks: $scope.remarks
        };
        
        landType.farmer = $scope.farmer.farmerDetail;
        landType.reportingOffice = $scope.reportingOfficeName;
        landType.reportingFieldOfficer = $scope.reportingFieldOfficerName;
        $scope.landTypes.push(landType);

        $scope.regNo = "";
        $scope.farmLandType = "";
        $scope.cultivationType = "";
        $scope.ownership = "";
        $scope.topography = "";
        $scope.landArea = "";
        $scope.lat = "";
        $scope.lon = "";
        $scope.remarks = "";
    };
    
    $scope.removeRow = function (index) {
        var regNo = $scope.landTypes[index].regNo;
        if ($window.confirm("Do you want to delete: " + regNo)) {
            $scope.landTypes.splice(index, 1);
        }
    };
    
    $scope.removeRowEdit = function(index){
        $scope.landTypes.splice(index, 1);
    }
    
    $scope.addFarmLandDetail = function(){
        console.log($scope.landTypes);
        
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.post($scope.urlServer + "api/farmLandDetail/createFarmLand", $scope.landTypes, config).then(
                function(response){
                    $scope.message("SUCCESS", response.data.message, "success");
                    if(response.status === 200){
                        $scope.getAllFarmLand();
                        $("addFarmlandDetails").modal("hide");
                    }
                },
                function(errResponse){
                    switch(errResponse.status){
                        case 401:
                            $scope.message("!ERROR!", "Error While Creating Farm Land.", "error");
                            $scope.goToLogin();
                            break;
                            
                        case 500:
                            $scope.message("!ERROR!", "Error While Creating Farm Land.", "error");
                            break;
                        default :
                            $scope.message("!ERROR!", "Unknown Error.", "error");
                            break;
                    }
                }
                );
        
    };
    
    $scope.getAllFarmLand = function(){
        
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/farmLandDetail/getAllFarmLand", config).then(
                function(response){
                    console.log(response.data);
                    $scope.farmLandDetails = response.data;
                    var data = response.data;
                    $scope.tableParams = new ngTableParams({
                        page: 1,
                        count: 5
                    },{
                        total: data.length + 1,
                        dataset: data
                    });
                },
                function(errResponse){
                    console.log(errResponse);
                    switch(errResponse.status){
                        case 401:
                            $scope.message("!ERROR!", "Error While Creating Farm Land.", "error");
                            $scope.goToLogin();
                            break;
                            
                        case 500:
                            $scope.message("!ERROR!", "Error While Creating Farm Land.", "error");
                            break;
                        default :
                            $scope.message("!ERROR!", "Unknown Error.", "error");
                            break;
                    }
                }
                );
    };
    
    $scope.loadAllFarmersName = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/farmer/getAllFarmerNames", config).then(
            function(response){
                $scope.farmersNameList = response.data;
            },
            function(errResponse){
                console.log("Failed To Load Farmer Name List. Error is: " + errResponse);
            }
        );
    }
    $scope.loadReportingOffceName = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/reportingOffice/getAllReportingOfficeName", config).then(
                function(response){
                    $scope.reportingOfficeNames = response.data;
                },
                function(errResponse){
                    console.log("Failed To Load Reporting Office List. Error is: " + errResponse);
                }
        );
    }
    $scope.loadReportingFieldOfficer = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/reportingFieldOfficer/getAllReportingFieldOfficerName", config).then(
                function(response){
                    $scope.reportingFieldOfficerNames = response.data;
                },
                function(errResponse){
                    console.log("Failed To Load Reporting Officer List. Error is: " + errResponse);
                }
        );
    }
        
    
    $scope.loadEditForm = function(farmLand){
        $("#editFarmlandDetails").modal("show");
        $scope.isEditAble = true;
        $scope.loadAllFarmersName();
        $scope.loadReportingOffceName();
        $scope.loadReportingFieldOfficer();
        
        $scope.farmLandEditData = {};
        
        $scope.farmLandEditData.farmerName = farmLand.farmer.farmerName;
        $scope.farmLandEditData.reportingOffice = farmLand.reportingOffice.officeName;
        $scope.farmLandEditData.reportingFieldOfficer = farmLand.reportingFieldOfficer.officerName;
        
        $scope.farmLandDetails;
        $scope.landTypes = [
        {
            "sn": 0,
            "id": 0,
            "regNo": null,
            "farmLandType": null,
            "cultivationType": null,
            "ownership": null,
            "topography": null,
            "landArea": null,
            "lat": null,
            "lon": null,
            "remarks": null
        }
    ];
        angular.forEach($scope.farmLandDetails, function(value, key){
            if(value.farmer.farmerName === $scope.farmLandEditData.farmerName && value.reportingOffice.officeName === $scope.farmLandEditData.reportingOffice && value.reportingFieldOfficer.officerName === $scope.farmLandEditData.reportingFieldOfficer){
                $scope.landTypes.push(value);
            }
        });
        
    };
    
    $scope.editLandTypes = function(index){
        
        $scope.editLandType = $scope.landTypes[index];
        
        $scope.regNo = $scope.editLandType.regNo;
        $scope.farmLandType = $scope.editLandType.farmLandType;
        $scope.cultivationType = $scope.editLandType.cultivationType;
        $scope.ownership = $scope.editLandType.ownership;
        $scope.topography = $scope.editLandType.topography;
        $scope.landArea = $scope.editLandType.landArea;
        $scope.lat = $scope.editLandType.lat;
        $scope.lon = $scope.editLandType.lon;
        $scope.remarks = $scope.editLandType.remarks;
        $scope.id = $scope.editLandType.id;
        $scope.removeRowEdit(index);
    }
    
    $scope.updateLandType = function(){
        var landType = {
            sn: $scope.landTypes.length + 1,
            id: $scope.id,
            regNo: $scope.regNo,
            farmLandType: $scope.farmLandType,
            cultivationType: $scope.cultivationType,
            ownership: $scope.ownership,
            topography: $scope.topography,
            landArea: $scope.landArea,
            lat: $scope.lat,
            lon: $scope.lon,
            remarks: $scope.remarks
        };
        
        landType.farmerName = $scope.farmLandEditData.farmerName;
        landType.reportingOfficeName = $scope.farmLandEditData.reportingOffice;
        landType.reportingFieldOfficerName =$scope.farmLandEditData.reportingFieldOfficer;
        
        $scope.landTypes.push(landType);

        $scope.regNo = "";
        $scope.farmLandType = "";
        $scope.cultivationType = "";
        $scope.ownership = "";
        $scope.topography = "";
        $scope.landArea = "";
        $scope.lat = "";
        $scope.lon = "";
        $scope.remarks = "";
    }
    
    $scope.editFarmLandDetail = function(){
        $scope.farmLandEditData.farmerName;
        $scope.farmLandEditData.reportingOffice;
        $scope.farmLandEditData.reportingFieldOfficer;
        $scope.landTypes;
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.put($scope.urlServer + "api/farmLandDetail/updateFarmLandDetails",  $scope.landTypes, config).then(
                function(response){
                    if(response.data.messageType === "success"){
                        $("#editFarmlandDetails").modal("hide");
                        $scope.message("SUCCESS", response.data.message, "success");
                        $scope.getAllFarmLand();
                    }
                },
                function(errResponse){
                    console.log(errResponse);
                }
        );
    }
    
});
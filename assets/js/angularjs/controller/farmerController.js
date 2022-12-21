app.controller('farmerCtrl', function (serverURL, uiURL, $scope, $http, ngTableParams, $window, SweetAlert, farmerFactory) {

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
        $scope.token = $window.localStorage.getItem("token");
        $scope.userName = $window.localStorage.getItem("userName");
        $scope.userRole = $window.localStorage.getItem("userRole");

    };

    $scope.loadAllFarmers = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.get($scope.urlServer + "api/farmer/getAllFarmers/", config).then(
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
    };

    $scope.loadGenderdata = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/gender", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.genders = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        );
    };

    $scope.loadFarmerTypeData = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/farmerType", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.farmerTypes = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        );
    };

    $scope.loadAllLocationData = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.get($scope.urlServer + "api/location/getAllLocations", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.locations = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        );
    };
    
    $scope.loadAllUnions = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }
        
        $http.get($scope.urlServer + "api/masterData/loadAllUnion", config).then(
            function(response){
                $scope.unionList = response.data;
            },
            function(errResponse){
                    console.log(errResponse);
            }
        );
    }
    
    $scope.loadMartialStatus = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/martial_status", config).then(
                function (response) {
                    console.log(response.data);
                    $scope.martialStatusList = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
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
    };

    $scope.loadAllDisease = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/diseases", config).then(
            function (response) {
                console.log(response.data);
                $scope.diseases = response.data;
            },
            function (errResponse) {
                $scope.message("!ERROR!", "Unknown Error", "error");
            }
        );
    };

    $scope.logout = function () {
        $window.sessionStorage.clear();
        $window.location.href = $scope.urlUI + 'index.html';
    };

    $scope.goToLogin = function () {
        $window.location.href = $scope.urlUI + 'index.html';
    };

    $scope.loadInitData = function () {
        $scope.loadAllFarmers();
        $scope.loadGenderdata();
        $scope.loadFarmerTypeData();
        $scope.loadAllLocationData();
        $scope.loadAllUnions();
        $scope.loadMartialStatus();
        $scope.loadAllDisease();
    };

    $scope.addFarmer = function (f_detail, f_members, ff_detail) {

        $scope.farmer = {};
        $scope.f_location = {
            "locationId": 1,
            "locationCode": "L001",
            "locationName": "Location-1"
        };
        $scope.farmer.farmerDetail = f_detail;
        $scope.farmer.farmerDetail.farmerLocation = $scope.f_location;
        $scope.farmer.farmerFamilyDetailList = f_members;

        $scope.farmer_family_members = [];

        $scope.farmer.farmerFinancialDetail = ff_detail;

        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        console.log("Location Data: " + $scope.locations);
        console.log("Farmer Add Data" + $scope.farmer);

        $http.post($scope.urlServer + "api/farmer/createFarmer", $scope.farmer, config).then(
                function (response) {
                    console.log(response);
                    
                    if(response.data.messageType === 'success'){
                        var fd = new FormData();
                            fd.append("file", $scope.file);
                            
                            var picUploader = farmerFactory.uploadProfilePic(fd, response.data.id);
                            
                            picUploader.then(function(result){
                                $scope.data = result;
                                console.log($scope.data);
                                if($scope.data.status === 200){
                                    $scope.message("SUCCESS", "Farmer Created Successfully", "success");
                                }
                            });
                    }else{
                        $scope.message("!ERROR!", response.data.message, "error");
                    }
                },
                function (errResponse) {
                    $scope.message("!ERROR!", errResponse.data.error, "error");
                }
        );
    };

    $scope.reportingOfficeNames = [];
    $scope.reportingFieldOfficers = [];
    $scope.zoneData = [];
    //$scope.farmer_dob = false;
    $scope.editFarmer = function (farmer) {
        if($scope.reportingOfficeNames.length === 0 ){
             $scope.loadReportingOfficeName();
        }
        if($scope.reportingFieldOfficers.length === 0){
             $scope.loadReportingFieldOfficer();
        }
        if($scope.zoneData.length === 0){
            $scope.loadZoneData();
        }
        if($scope.bloodGroupList.length === 0){
            $scope.loadBloodGroupList();
        }
        $scope.frm = farmer;
        $scope.farmer = {};
        $scope.profilePicturePath = "http://localhost:8080/apexJWT/farmerImages/" + farmer.farmerDetail.profileImagePath;
        $scope.farmer.farmerDetail = farmer.farmerDetail;
        $scope.f_detail = farmer.farmerDetail;
        $scope.f_members = farmer.farmerFamilyDetailList;
        $scope.ff_detail = farmer.farmerFinancialDetail;
        $scope.farmer.farmerFamilyDetailList = $scope.f_members;
        $scope.farmer.farmerFinancialDetail = farmer.farmerFinancialDetail;
        $scope.joiningDate = new Date(farmer.joiningDate);
        $scope.f_detail.dob = new Date(farmer.farmerDetail.dob);
        $scope.frm.farmerType = farmer.farmerType;
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
                
                function(response){
                    $scope.reportingOfficeNames = response.data;
                },
                function(errResponse){
                    $scope.message("!ERROR!", errResponse.data.error, "error");
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
        
        $http.get($scope.urlServer + "api/reportingFieldOfficer/getAllReportingFieldOfficer", config).then(
                
                function(response){
                    $scope.reportingFieldOfficers = response.data;
                },
                function(errResponse){
                    $scope.message("!ERROR!", errResponse.data.error, "error");
                }
                
                );
    }
    
    $scope.loadZoneData = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/zone", config).then(
                function (response) {
                    $scope.zoneData = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        );
    };

    $scope.bloodGroupList = [];

    $scope.addFarmerChk = function () {
        $scope.frm = "";
        if($scope.bloodGroupList.length === 0){
            $scope.loadBloodGroupList();
        }
        if($scope.reportingOfficeNames.length === 0 ){
             $scope.loadReportingOfficeName();
        }
        if($scope.reportingFieldOfficers.length === 0){
             $scope.loadReportingFieldOfficer();
        }
        if($scope.zoneData.length === 0){
            $scope.loadZoneData();
        }
//        $scope.f_detail = "";
//        $scope.f_members = "";
//        $scope.ff_detail = "";
    };
    
    $scope.loadBloodGroupList = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.get($scope.urlServer + "api/dropdown/getDropdownListByName/blood_group", config).then(
                function (response) {
                    $scope.bloodGroupList = response.data;
                },
                function (errResponse) {
                    $scope.message("!ERROR!", "Unknown Error", "error");
                }
        );
        
    }

    $scope.updateFramer = function (f_detail, f_members, ff_detail) {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $scope.farmer.farmerDetail = f_detail;
        $scope.farmer.farmerFamilyDetailList = f_members;
        $scope.farmer.farmerFinancialDetail = ff_detail;

        $http.put($scope.urlServer + "api/farmer/updateFarmer", $scope.farmer, config).then(
                function (response) {
                    console.log(response);
                    switch (response.data.messageType) {
                        case 'success':
                            $scope.message("SUCCESS", response.data.message, "success");
                            var fd = new FormData();
                            fd.append("file", $scope.file);
                            
                            var picUploader = farmerFactory.uploadProfilePic(fd, $scope.farmer.farmerDetail.id);
                            
                            picUploader.then(function(result){
                                $scope.data = result;
                                console.log($scope.data);
                                if($scope.data.status === 200){
//                                    $scope.message("SUCCESS", "Farmer Created Successfully", "success");
                                }
                            });
                            $('#addOrEditFarmer').modal('hide');
                            $scope.loadAllFarmers();
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
                    $('#addOrEditFarmer').modal('hide');
                }
        );
    }
    
    $scope.deleteFarmer = function(farmerId){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        $http.delete($scope.urlServer + "api/farmer/deleteFarmer/"+farmerId, config).then(
                function(response){
                    switch (response.data.messageType){
                        case 'SUCCESS':
                            $scope.message("SUCCESS", response.data.message, 'success');
                            $scope.loadAllFarmers();
                            break;
                        case 'ERROR':
                            $scope.message("!ERROR!", response.data.message, 'error');
                            break;
                        default:
                            $scope.message("WARNING", "Unknown Error", "warning");
                            break;
                    }
                },
                function(errResponse){
                    $scope.message("!ERROR!", "Unknown Error", 'error');
                }
                );
    }

    $scope.f_members = [
        {
            "id": 0,
            "memberName": null,
            "relationWithMember": null,
            "contactNumber": null,
            "memberDob": null
        }
    ];
    console.log("F_MEMBERS:" + $scope.f_members[0].memberName);
    $scope.addFamilyMember = function () {
        var f_member = {
            id: $scope.f_members.length + 1,
            memberName: $scope.memberName,
            relationWithMember: $scope.relationWithMember,
            contactNumber: $scope.contactNumber,
            memberDob: $scope.memberDob
        };

        $scope.f_members.push(f_member);

        $scope.memberName = "";
        $scope.relationWithMember = "";
        $scope.contactNumber = "";
        $scope.memberDob = "";
    };

    $scope.removeRow = function (index) {
        var name = $scope.f_members[index].memberName;
        if ($window.confirm("Do you want to delete: " + name)) {
            $scope.f_members.splice(index, 1);
        }
    };
    
    $scope.profilePicturePath = "../assets/images/proimage.jpeg";
});

app.factory('farmerFactory', function($http,serverURL){
        
        var uploadProfilePic = function(formData, farmerId){
          return $http.post(serverURL + "api/farmer/uploadImage/" + farmerId, formData, {
                                transformRequest: angular.identity,
                                headers: {
                                    'Content-Type': undefined
                                }}).then(
                  function(response){
                      return response;
                  },
                  function(errResponse){
                      console.log("Add Farmer Error From Factory." + errResponse);
          });
        };
        
        return {uploadProfilePic: uploadProfilePic};
        
        });
app.controller('contractCtrl', function (serverURL, uiURL, $scope, $http, ngTableParams, $window, SweetAlert) {

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
    }

    $scope.goToLogin = function () {
        $window.location.href = $scope.urlUI + 'index.html';
    }

    $scope.loadAllCrop = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.get($scope.urlServer + "api/masterData/getAllActiveCrops", config).then(
                function (response) {
                    $scope.cropList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadAllFarmers = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + 'api/farmer/getALLActiveFarmer', config).then(
                function (response) {
                    $scope.farmerList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadAllReportingOffice = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/reportingOffice/getAllActiveReportingOffice", config).then(
                function (response) {
                    $scope.officeList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadAllReportingFieldOfficer = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/reportingFieldOfficer/getAllActiveReportingFieldOfficer", config).then(
                function (response) {
                    $scope.officerList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadAllWarehouseList = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/masterData/getAllActiveWarehouseList", config).then(
                function (response) {
                    $scope.warehouseList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadAllLandDetails = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/masterData/getAllLandDetails", config).then(
                function (response) {
                    $scope.landList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadAllActiveSeasonList = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        $http.get($scope.urlServer + "api/masterData/getAllActiveSeasonList", config).then(
                function (response) {
                    $scope.seasonList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadCropVarietyByCrop = function (crop) {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/masterData/getCropVarietyByCropName/" + crop.cropName, config).then(
                function (response) {
                    $scope.cropVarietyList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadAllFarmInputCategory = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/masterData/getAllInputCategory", config).then(
                function (response) {
                    $scope.inputCategoryList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadAllProducts = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/product/getAllProducts", config).then(
                function (response) {
                    $scope.productList = response.data;
                },
                function (errResponse) {
                    console.log(errResponse);
                }
        );
    };

    $scope.loadProductByCategory = function (inputCatId) {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };

        $http.get($scope.urlServer + "api/product/getProductByCategory/" + inputCatId.id, config).then(
                function (response) {
                    $scope.productList = response.data;
                    $scope.stock = "";
                    $scope.unit = "";
                    $scope.price = "";
                },
                function (errRespone) {
                    console.log(errRespone);
                }
        );
    }

    $scope.loadInitData = function () {
        $scope.loadAllCrop();
        $scope.loadAllFarmers();
        $scope.loadAllReportingOffice();
        $scope.loadAllReportingFieldOfficer();
        $scope.loadAllWarehouseList();
        $scope.loadAllLandDetails();
        $scope.loadAllActiveSeasonList();
        $scope.loadAllFarmInputCategory();
//        $scope.loadAllProducts();
    };


    $scope.seasonDetails = [
        {
            "id": 0,
            "landName": null,
            "landArea": null,
            "seasonName": null,
            "cropName": null,
            "cropvarietyName": null,
            "landId": 0,
            "seasonId": 0,
            "cropId": 0,
            "cropVarietyId": 0
        }
    ];

    $scope.addContractSeasion = function (land, season, crop, cropVariety) {
        $scope.landId = land.id;
        $scope.seasonId = season.id;
        $scope.cropId = crop.id;
        $scope.cropVarietyId = cropVariety.id;

        $scope.landName = land.landName;
        $scope.landArea = land.landSize;
        $scope.seasonName = season.seasonName;
        $scope.cropName = crop.cropName;
        $scope.cropVarietyName = cropVariety.varietyName;

        var seasonDetail = {
            id: $scope.seasonDetails.length + 1,
            landName: $scope.landName,
            landArea: $scope.landArea,
            seasonName: $scope.seasonName,
            cropName: $scope.cropName,
            cropVarietyName: $scope.cropVarietyName,
            landId: $scope.landId,
            seasonId: $scope.seasonId,
            cropId: $scope.cropId,
            cropVarietyId: $scope.cropVarietyId
        };

        $scope.seasonDetails.push(seasonDetail);

        $scope.land = "";
        $scope.season = "";
        $scope.crop = "";
        $scope.cropVariety = "";
    };

    $scope.removeSeasonRow = function (index) {
        var name = $scope.seasonDetails[index].landName;
        if ($window.confirm("Do you want to delete: " + name)) {
            $scope.seasonDetails.splice(index, 1);
        }
    };

    $scope.inputDetails = [
        {
            "id": 0,
            "inputCatName": null,
            "productName": null,
            "stockQty": 0,
            "unitProduct": 0,
            "priceProduct": 0,
            "distriQty": 0,
            "subTotal": 0,
            "inputCategory" : null,
            "unit" : 0,
            "price" : 0,
            "distributionQty" : 0,
            "inputCategoryName" : null
        }
    ];

    $scope.addContractInput = function (inputCategory, product, stock, unit, price, distribution, total) {
        $scope.inputCatName = inputCategory.inputCatName;//$scope.inputCategory.inputCatName;
        $scope.productName = product.productName;//$scope.product.productName;
        $scope.stockQty = stock;//$scope.stock;
        $scope.unitProduct = unit;//$scope.unit;
        $scope.priceProduct = price;//$scope.price;
        $scope.distriQty = distribution;//$scope.distribution;
        $scope.subTotal = total;//$scope.total;

        var inputDetail = {
            id: $scope.inputDetails.length + 1,
            inputCatName: inputCategory.inputCatName,
            productName: product.productName,
            stockQty : stock,
            unitProduct: unit,
            priceProduct: price,
            distriQty: distribution,
            subTotal: total,
            inputCategory : inputCategory,
            "unit" : unit,
            "price" : price,
            "distributionQty" : distribution,
            "inputCategoryName" : inputCategory.inputCatName
        };

        $scope.inputDetails.push(inputDetail);

        $scope.inputCategory = "";
        $scope.product = "";
        $scope.stock = "";
        $scope.unit = "";
        $scope.price = "";
        $scope.distribution = "";
        $scope.total = "";
    };

    $scope.removeInputDetailRow = function (index) {
        var name = $scope.inputDetails[index].inputCatName;
        if ($window.confirm("Do you want to delete: " + name)) {
            $scope.inputDetails.splice(index, 1);
        }
    };
    
    $scope.loadProductData = function(product){
        $scope.stock = product.productQty;
        $scope.unit = product.productUom;
        $scope.price = product.productPrice;
    };
    
    $scope.calculateTotal = function(){
        $scope.total = $scope.price * $scope.distribution;
    };

    $scope.cd = {
      "farmer" : null,
      "office" : null,
      "officer" : null,
      "warehouse" : null,
      "seasonDetailRequestList" : null,
      "inputDetailRequestList" : null,
      "paymentDetail" : null
    };

    $scope.addContractSeason = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        };
        
        console.log($scope.seasonDetails);
        console.log($scope.inputDetails);
        console.log($scope.farmer);
        console.log($scope.office);
        console.log($scope.officer);
        console.log($scope.warehouse);
        console.log($scope.pd);
        
        $scope.cd.farmer = $scope.farmer;
        $scope.cd.office = $scope.office;
        $scope.cd.officer = $scope.officer;
        $scope.cd.warehouse = $scope.warehouse;
        $scope.cd.seasonDetailRequestList = $scope.seasonDetails;
        $scope.cd.inputDetailRequestList = $scope.inputDetails;
        $scope.cd.paymentDetail = $scope.pd;
        
        $http.post($scope.urlServer + "api/contract/createContractDetail", $scope.cd, config).then(
            function(response){
                    console.log(response);
                    switch (response.data.messageType){
                        case 'success':
                            $scope.message("SUCCESS", response.data.message, 'success');
                            $scope.seasonDetails = "";
                            $scope.inputDetails = "";
                            $scope.farmer = "";
                            $scope.office = "";
                            $scope.officer = "";
                            $scope.warehouse = "";
                            $scope.pd = "";
                            break;
                        case 'error':
                            $scope.message("!ERROR!", response.data.message, 'error');
                            break;
                        default:
                            $scope.message("WARNING", "Unknown Error", "warning");
                            break;
                    }
            },
            function(errResponse){
                    console.log(errResponse);
            }
        );
    };
});
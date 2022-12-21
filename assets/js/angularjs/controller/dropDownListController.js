app.controller('dropDownCtrl', function (serverURL, uiURL, $scope, $timeout, $q, $http, ngTableParams, $window, SweetAlert) {

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

    // $scope.testLoad = function (){
    //     var config = {
    //         headers: {
    //             'NO-AUTH': 'True',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + $scope.token
    //         }
    //     };
    //     var deferred = $q.defer();
    //     $timeout();
    //     return deferred.promise;
    //
    // }

    $scope.loadAllDropDownList123 = function (){


        $('#tableDD').DataTable({
            processing: true,
            ordering: false,
            bStateSave: true,
            serverSide: true,
            pageLength: 15,
            pagingType: "full_numbers",
            dom: 'Bfrtip',
            buttons: [
                'pageLength',
                {
                    extend: 'collection',
                    text: 'Export Data',
                    buttons: [ 'pdfHtml5', 'excelHtml5', 'csvHtml5', 'copyHtml5' ]
                }
            ],
            lengthMenu: [ [ 15, 50, 200, 300, 100000 ], [ '15 Rows', '50 Rows', '200 Rows', '300 Rows', 'Show All Rows' ]],
            buttons: [
                'pageLength',
                {
                    extend: 'collection',
                    text: 'Export Data',
                    buttons: [ 'pdfHtml5', 'excelHtml5', 'csvHtml5', 'copyHtml5' ]
                }
            ],
            ajax: {
                data:{"REQ":'getAllDropdownData'},
                url: $scope.urlServer + "api/dropdown/getAllDropDownList",
                dataType: "JSON",
                type: "GET"
            },
            // data: dataDt.data,
            columns: [
                { data: "dropdownId", width: "10%"},
                { data:  "dropdownName" , width: "30%"},
                { data:  "dropdownText", width: "10%"},
                { data:  "dropdownValue", width: "10%"},
                { data:  "status", width: "15%"}
            ]
        });
    }

    $scope.loadAllDropDownList = function () {
        
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 5,
        }, {
            getData: function ($defer, params) {
                var searchData = '';
                if(!params.filter()){
                    var searchData = '';
                }
                var page = params.page();
                var size = params.count();
                var testUrl = 'http://localhost:9099/aal/api/dropdown/getAllDropDownList';
                var search = {
                    draw: page,
                    start: page,
                    length: size,
                    search: searchData
                }
                $http.get(testUrl, { params: search, headers: { 'Content-Type': 'application/json'} })
                    .then(function(res) {
                            params.total(res.data.recordsTotal);
                            $defer.resolve(res.data.data);
                        }, function(reason) {
                            $defer.reject();
                        }
                    );
            },
        });

            // ?draw=1&start=1&length=10&search=
        // $http.get($scope.urlServer + "api/dropdown/getAllDropDownListDt", config).then(
        //     function (response) {
        //         console.log(response);
        //         var dataDt = response.data.data;
        //         // alert(dataDt);
        //         $scope.dropDownListDt = dataDt;
        //         // $scope.tableParams = new NgTableParams({
        //         //     page: 1,
        //         //     count: 5
        //         // }, {
        //         //     total: data.length,
        //         //     dataset: data
        //         // });
        //
        //     },
        //     function (errResponse) {
        //
        //     }
        // );

        // $http.get($scope.urlServer + "api/dropdown/getAllDropDownListDt", config).then(
        //     function (response){
        //         console.log(response);
        //         $scope.dropDownListDt = response.data;
        //     },
        //     function(errResponse){
        //         console.log(errResponse);
        //     }
        // );
    }

    $scope.dataTableOptions = {
        dom: "tableDD",
        lengthMenu: [[25, 50, -1], [25, 50, "All"]],
        language: {
            emptyTable: 'No items matched your search criteria'
        },
        buttons: [
            {
                text: 'Export',
                className: 'button button:hover',
                extend: 'csv'
            }
        ]
    };

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
        $scope.loadAllDropDownList123();
    }

    $scope.addDropDown = function (dd) {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        dd.status = 'active';
        
        $http.post($scope.urlServer + "api/dropdown/addDropDown", dd, config).then(
            function (response) {
                console.log(response);
                switch (response.data.messageType) {
                    case 'success':
                        $scope.message("SUCCESS", response.data.message, "success");
                        $("#addOrEditDropDown").modal("hide");
                        $scope.loadAllDropDownList();
                        break;
                    case 'error':
                        $scope.message("!ERRRO!", response.data.message, "error");
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

    $scope.editDropDown = function (dd) {
        $scope.dd = dd;
    }
    $scope.addDropDownClick = function(){
        $scope.dd = {};
    }

    $scope.updateDropDown = function (dd) {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.put($scope.urlServer + "api/dropdown/updateDropDown", dd, config).then(
            function (response) {
                console.log(response);
                switch (response.data.messageType) {
                    case 'success':
                        $scope.message("SUCCESS", response.data.message, "success");
                        $('#addOrEditDropDown').modal('hide');
                        $scope.loadAllDropDown();
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
                $('#addOrEditDropDown').modal('hide');
            }
        );
    }

});
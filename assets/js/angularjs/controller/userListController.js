app.controller('userListCtrl', function (serverURL, uiURL, $scope, $http, ngTableParams, $window, SweetAlert) {

    $scope.loadSessionData = function () {
        $scope.token = $window.localStorage.getItem("token");
        $scope.userId = $window.localStorage.getItem("userId");
        $scope.employeeName = $window.localStorage.getItem("employeeName");
        $scope.roleName = $window.localStorage.getItem("userRole");
    }
    $scope.loadSessionData();

    $scope.message = function (title, msg, type) {
        SweetAlert.swal(title, msg, type);
    }
    
    $scope.goToLogin = function () {
        $window.location.href = uiURL + 'index.html';
    }

    $scope.getUserListData = function () {

        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.get(serverURL + "api/user/getAllUser", config).then(
            function (response) {
                var data = response.data;
                $scope.users = data;
                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 5           // count per page
                }, {
                    total: data.length, // length of data
                    dataset: data
                });

                 $scope.usersTable = new NgTableParams({
                    page: 1,
                    count: 5
                }, {
                    total: $scope.users.length,
                    getData: function($defer, usersTable){
                        usersTable.total($scope.users.length);
                        $scope.data = $scope.users.slice((usersTable.page() - 1) * usersTable.count(), usersTable.page() * usersTable.count());
                        $defer.resolve($scope.data);
                    }
                 });

            },
            function (errResponse) {

            }
        );
    }
    $scope.getUserListData();

    $scope.getUserInfo = function (userId) {
        if (angular.isUndefined(userId)) {
            return;
        }
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.get(serverURL + "api/mgt/getEmployeeDetail/" + $scope.addUser.userId, config)
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
                    if (angular.equals(response.data.message, 'EXIST')) {
                        $scope.message('!ERROR!', 'User Already Exist', 'error');
                        $scope.userName = '';
                        $scope.designation = '';
                        $scope.department = '';
                        $scope.reportingTo = '';
                        return;
                    }
                    $scope.addUser.employeeName = response.data.employeeDetails.employeeName;
                    $scope.addUser.designation = response.data.employeeDetails.designation;
                    $scope.addUser.department = response.data.employeeDetails.department;
                    $scope.addUser.telephoneNo = response.data.employeeDetails.phone;
                    $scope.addUser.emailId = response.data.employeeDetails.email;
                    $scope.addUser.telephoneExt = response.data.employeeDetails.ext;
                    $scope.getReportingUser($scope.addUser.department);
                },
                function (errResponse) {
                    if(errResponse.status == "401"){
                        $scope.goToLogin();
                    }
                    $scope.message('!ERROR!', 'Error While Retriving User Info', 'error');
                    $scope.userName = '';
                    $scope.designation = '';
                    $scope.department = '';
                    $scope.reportingTo = '';
                }
            );
    };

    $scope.editUser = function (user) {
        console.log(user);
        $scope.userData = user;
        $scope.getDepartment();
        $scope.getReportingUser("System");
        $scope.getAllRoles();
        $scope.userData.reportingUser = user.reportingTo;
        $scope.userData.roleName = user.roles[0].roleName;
    }

    $scope.logout = function () {
        $window.sessionStorage.clear();
        $window.location.href = $scope.urlUI + 'index.html';
    }

    $scope.getDepartment = function () {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }
        $http.get(serverURL + "api/dept/findAllActive", config).then(
            function (response) {
                console.log(response);
                $scope.departments = response.data;

            },
            function (errResponse) {

            }
        );

    }
    
    $scope.getAllRoles = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }
        
        $http.get(serverURL + "getAllRoles", config).then(
            function (response) {
                console.log(response);
                $scope.roles = response.data;

            },
            function (errResponse) {
                   console.log("Failed to load role list.");
            }
        );
    }

    $scope.addUserUtilityFunc = function () {
        $scope.getDepartment();
    }

    $scope.getReportingUser = function (deptName) {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }
        $http.get(serverURL + "api/mgt/getReportingUsers/" + deptName, config).then(
            function (response) {
                console.log(response);
                $scope.reportingUsers = response.data;

            },
            function (errResponse) {

            }
        );
    }

    $scope.addUserDetails = function (addUser) {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }
        addUser.password = '123';
        $scope.role = [
            {
                "roleName" : addUser.roles
            }
        ];
        addUser.roles = $scope.role;
        $http.post(serverURL + "api/mgt/addUser", addUser, config).then(
            function (response) {
                console.log(response.data);
                switch (response.data.message) {
                    case 'SUCCESS':
                        $scope.message('Success', 'User Created Successfully', 'success');
                        break;
                    case 'ERROR':
                        $scope.message('!ERROR!', 'Error While Creating User', 'error');
                        break;
                    case 'EXIST':
                        $scope.message('!INFO!', 'User Already Added', 'info');
                        break;
                    default:
                        $scope.message('!ERROR!', 'Unknown Error', 'warning');
                }
            },
            function (errResponse) {
                $scope.message('!ERROR!', 'Unknown Error', 'warning');
            }
        );


    }

    $scope.changePassword = function (cp) {
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }

        $http.post(serverURL + "api/user/changePassword", cp, config).then(
            function (response) {
                console.log(response);
                switch (response.data.messageType) {
                    case 'SUCCESS':
                        $scope.message('SUCCESS', response.data.message, 'success');
                        break;
                    case 'ERROR':
                        $scope.message('!ERROR!', response.data.message, 'error');
                        break;
                    default:
                        $scope.message('!ERROR!', 'Unknown Error', 'error');
                }

            },
            function (errResponse) {
                $scope.message('!ERROR!', 'Unknown Error', 'error');
            }
        );
    }
    
    $scope.updateUserData = function(userData){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }
         $scope.userUpdateData = {};
        $scope.userUpdateData.userId = userData.userId;
        $scope.userUpdateData.department = userData.department;
        $scope.userUpdateData.email = userData.email;
        $scope.userUpdateData.extNo = userData.extNo;
        $scope.userUpdateData.mobile = userData.mobile;
        $scope.userUpdateData.reportingTo = userData.reportingUser;
        $scope.userUpdateData.role = userData.roleName;
        
        $http.put(serverURL + "api/user/updateUserData", $scope.userUpdateData, config).then(
                function(response){
                    console.log(response);
                    switch (response.data.messageType) {
                    case 'SUCCESS':
                        $scope.message('SUCCESS', response.data.message, 'success');
                        $("userUpdateModal").modal("hide");
                         $scope.getUserListData();
                        break;
                    case 'ERROR':
                        $scope.message('!ERROR!', response.data.message, 'error');
                        break;
                    default:
                        $scope.message('!ERROR!', 'Unknown Error', 'error');
                }
                },
                function(errResponse){
                    console.log(errResponse);
                     $scope.message('!ERROR!', 'Unknown Error', 'error');
                }
        );
    }
    
    $scope.userDeleteConfirmation = function(user){
        $("#userDeleteModalConfirmation").modal("show");
        $scope.deleteUserData = user;
    }
    
    $scope.deleteUser = function(){
        var config = {
            headers: {
                'NO-AUTH': 'True',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $scope.token
            }
        }
        
        $http.delete(serverURL + "api/user/deleteUser/"+$scope.deleteUserData.userId, config).then(
            function(response){
                switch (response.data.messageType) {
                    case 'SUCCESS':
                        $("#userDeleteModalConfirmation").modal("hide");
                        $scope.message('SUCCESS', response.data.message, 'success');
                         $scope.getUserListData();
                        break;
                    case 'ERROR':
                        $scope.message('!ERROR!', response.data.message, 'error');
                        break;
                    default:
                        $scope.message('!ERROR!', 'Unknown Error', 'error');
                }
            },
            function(errResponse){
                $scope.message('!ERROR!', 'Unknown Error.', 'error');
            }
         );
    }
});
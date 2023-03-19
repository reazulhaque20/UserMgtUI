app.controller('appliedUserCtrl', function (serverURL, $scope, $http, ngTableParams) {

    $scope.getAppliedUserData = function () {
        $scope.urlServer = serverURL;//protocol + "//" + host + ":" + "8081" + "/";
        $http.get(serverURL + "api/mgt/getAllInactiveUsers").then(
            function (response) {
                $scope.employees = response.data.employees;
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );


    }

    $scope.getAppliedUserData();
    
    $scope.getAllRoles = function(){
        $http.get(serverURL + "api/role/getAllRoles").then(
          function(response){
              $scope.roles = response.data;
          },
          function(errResponse){
                    console.log(errResponse);
          }
        );
    }
    $scope.getAllRoles();
});
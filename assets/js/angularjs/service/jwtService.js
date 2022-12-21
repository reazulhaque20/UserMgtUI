// app.service('jwtToken', function () {
//     var token = '';

//     this.getData = function () {
//         return token;
//     },

//         this.setData = function (reqData) {
//             token = reqData;
//         }
// });

app.factory('jwtToken', function () {
    var token = [];

    return {
        set: set,
        get: get 
    };

    function set(reqData) {
        token.push(reqData);
    }
    function get() {
        return token;
    }
});
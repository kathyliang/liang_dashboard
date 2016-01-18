/* Setup general page controller */
var MetronicApp = angular.module("MetronicApp", []); 
angular.module('MetronicApp').controller('AuthController', ['$rootScope', '$scope', 'auth', function($rootScope, $scope,auth) {
        var AuthController = this;
        AuthController.hello = "hello AuthController"

        AuthController.login = function() {
            auth.login(AuthController.username, AuthController.password)
            console.log('hi')
        };
        // AuthController.login('aiden','ace68723')

}]);
MetronicApp.constant("API_URL", "https://www.chanmao.ca/index.php?r=");

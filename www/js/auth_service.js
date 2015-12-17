'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */
angular.module('MetronicApp')
  .factory('auth', ['$window','$injector','$location','API_URL',function ($window, $injector,$location,API_URL) {
    var storage = $window.localStorage;
    var auth = {};
    var cachedToken;
    var cachedLocation;
    var res_code;

   
    auth.setToken = function(token) {
        cachedToken = token;
        storage.setItem('userToken', token);
    };
    auth.getToken = function() {
        if(!cachedToken)
            cachedToken = storage.getItem('userToken');
        return cachedToken;
    };
    auth.isAuthenticated = function() {
        return !!this.getToken();
    };
    auth.removeToken = function() {
        storage.removeItem('userToken');
        cachedToken = null;
    };

    
    auth.doAuth = function() {
        var $http =  $injector.get('$http')
        $http.get(API_URL + 'MobLogin/loginwc').
            success(function(data, status, headers,conifg) {
                console.log(data)
                if(data.result == 1){
                    if(data.token){
                        auth.setToken(data.token)
                    }
                    $location.path('/tab/history')
                }else{
                    console.log('remove token')
                    auth.removeToken(); 
                    $location.path('/login')
                }
                
            })
            .error(function(data, status, headers,conifg) {
                console.log('error send res code')
            });

    }
    
    
    return auth
  }]);

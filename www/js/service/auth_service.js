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
    var cachedState_key;

   
    auth.setToken = function(token) {
        cachedToken = token;
        storage.setItem('userToken', token);
    };
    auth.setState_key = function (token) {
        cachedState_key = '\"' + token + '\"' ;
        console.log(cachedState_key)
        storage.setItem('state.key_-userToken', cachedState_key);
    }

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
        $http.get(API_URL + 'MobMonitor/Auth').
            success(function(data, status, headers,conifg) {
                console.log(data)
                if(data.result == 0){
                    if(data.token){
                        auth.setToken(data.token)
                        auth.setState_key(data.token)
                    }
                    // $location.path('/tab/history')
                    // window.location="../cs/index.html"
                }else{
                    console.log('remove token')
                    auth.removeToken(); 
                     window.location="../cs/login.html"
                }
                
            })
            .error(function(data, status, headers,conifg) {
                console.log('error send res code')
            });

    }
    
    auth.login = function (username,password) {
        var $http =  $injector.get('$http')
        var eo_data = {};
        eo_data.username = username;
        eo_data.password = password;

        $http({
          method: 'POST',
          url: API_URL+'/MobMonitor/Login',
          data:eo_data
        }).then(function successCallback(response) {
            
            console.log(response);
            var lo_data = response.data;
            
            
            if(lo_data.ev_result==0){
                auth.setToken(lo_data.ev_token);
                 auth.setState_key(lo_data.ev_token);
                 // window.location="../cs/index.html"
                 window.location="../index.html"

            }else{
                console.log('用户名或密码错误')
                alert("用户名或密码错误")
            }

          }, function errorCallback(response) {
            console.log(response);
          });


    }
    auth.logout = function() {
        auth.removeToken();
        // window.location="../cs/login.html"
        window.location="../login.html"
    };
    auth.authenticaton = function () {
        var $http =  $injector.get('$http')
        $http({
          method: 'GET',
          url: API_URL+'/MobMonitor/Auth'
        }).then(function successCallback(response) {
             var lo_data = response.data;
            if(lo_data.ev_result==0){
                $location.path('/dashboard.html');
            }else{
               
                auth.removeToken();
                // window.location="../cs/login.html"
                window.location="../login.html"
                alert("请重新输入用户名和密码");
            }

          }, function errorCallback(response) {
            console.log(response);
          });

    }
    return auth
  }]);

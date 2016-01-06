'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */
angular.module('MetronicApp')
  .factory('AlertService', function () {
    var AlertService = {};
    AlertService.ev_message ='hi'
    AlertService.alert =function  (iv_meessage) {
        AlertService.ev_message = iv_meessage;
        console.log(AlertService.ev_message)
    };
    return AlertService
  });

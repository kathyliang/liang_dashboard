angular.module('MetronicApp')
.service('dashboardService',function  () {
  var dashboardService = {};
  var lo_data;


  dashboardService.save = function(data) {
    lo_data = data
  };

   dashboardService.get = function  () {
   	
	console.log("hello service");
     return lo_data
   }
  return dashboardService
})
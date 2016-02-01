

angular.module("MetronicApp")
.directive('cmForm', function(dashboardService,$parse,$http) {
	return {
      	restrict: 'A',
      	scope:{
      		orders: '='
      	},
      	link: function($scope, element, attrs) {
      		
      			$http({
      			  method: 'GET',
      			  url: 'https://www.chanmao.ca/index.php?r=MobMonitor/OrderList',
      			  headers: {
      			   'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDYxMSIsImV4cGlyZWQiOjE0NTQzMDE3ODd9.Zanu0l3LW31UlGZ72PXbcBUDPGOstKai2oMYiX4ab_Y'
      			  },
      			}).then(function successCallback(response) {
      			    // console.log("get  test ",response)
      			    orders = response.data.ea_orders;
      			  }, function errorCallback(response) {
      			   // alertService.alert(response);
      			  });
      		
      		setTimeout(function() {
                var search = element.find("div.input-group");
                var input = element.find("input");

                console.log("search",search);
                search.click(function () {
                    element.addClass("open");
                    input.focus(); 
                    dashboardService.get();
                });
	      		element.bind("keydown keypress", function (event) {
  		           if(event.which === 13) {
  		               console.log("enter",input[0].value)
  		               var searchText = input[0].value;
  		               serach_order = _.find(orders, function(o){
                      return o.oid == searchText;
                     });
                     console.log("serach_order",serach_order);
  		           }
  		       	});
                input.bind("blur",function  () {
	  				element.removeClass("open");
	  			});

      		}, 2000);
			
      	}
	}
});

// $scope.$watch("cmForm", function() {
      			
// 		$scope.cmTest();

// 		console.log($scope.cmFocus)

// 		if($scope.cmFocus){
// 			element.focus(); 
// 		}
		
// 		if($scope.ngModel){
			
// 			$http({
// 			  method: 'POST',
// 			  url: $scope.cmUrl,
// 			  data: $scope.ngModel
// 			}).then(function successCallback(response) {
			  
// 			  }, function errorCallback(response) {

// 			 });
// 		}
		
// });

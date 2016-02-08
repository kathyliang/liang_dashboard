angular.module("MetronicApp")
.directive('cmForm', function(dashboardService,$timeout,$modal,$log) {
	return {
      	restrict: 'A',
      	scope:{
      		orders: '='
        },
        link: function($scope, element, attrs) {
      			$timeout(function() {
                    data = dashboardService.get_orders();
                    orders = data.orders;
                    // orders = dashboardService.get_orders().orders;
                    console.log("test get",orders);

                }, 2000);

          		$timeout(function() {
                    var search = element.find("div.input-group");
                    var input = element.find("input");
                    // console.log("search",search);
                    search.click(function () {
                        element.addClass("open");
                        input.focus(); 
                        // dashboardService.get();
                    });
    	      		element.bind("keydown ", function (event) {
      		            if(event.which === 13) {
      		               // console.log("enter",input[0].value)
      		                var searchText = input[0].value;
      		                serach_order = _.find(orders, function(order){
                                return order.oid == searchText;
                            });
                            console.log("serach_order",serach_order);
                            console.log("order",orders);
                            if (serach_order){
                                serach_order.type = "od"
                                open(serach_order)
                            }else{
                                alert("未找到当日订单");
                            }
                            
      		            }
      		       	});
                    input.bind("blur",function  () {
                        var searchText = input[0].value;
                        if(!searchText){
                            element.removeClass("open");
                        }
    	  				
    	  			});
          		}, 2000);
    	}
        
            
	}

    function open (serach_order) {
        var modalInstance = $modal.open(
        {
            templateUrl: 'views/searchOrder.html',
            controller: 'popUpCtrl as puc',
            resolve:
            {
                data: function()
                {
                    return serach_order;
                }
            }
        });
          
        modalInstance.result.then(function()
        {
            
        }, function()
        {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
});


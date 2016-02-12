angular.module('MetronicApp')
.service('dashboardService',function  ($http,$interval,API_URL) {
  var dashboardService = {};
  var lo_data  ={};
  var lo_fdata ={};

   	dashboardService.get_init = function  () {
   		get_API();
   		// lo_data.account = 0;
   		$interval(function() { 
   		    get_API();
   		},30000)
   	}
   	function get_API() {
        $http({
          method: 'GET',
          url: API_URL+'MobMonitor/OrderList',
        }).then(function successCallback(response) {
            // console.log(response)
            lo_data.orders = response.data.ea_orders;
            // dashboardService.save(lo_data.orders);
            // var ll = dashboardService.get();
            // console.log("liangliang",ll);
            lo_data.statas = response.data.ea_stats;
            // lo_data.account +=1;
             setOrders();
             //dashboardService.save(lo_data.orders);
        }, function errorCallback(response) {
           // alertService.alert(response);
        });
        
        function setOrders() {

            lo_fdata.new_order = [];
            lo_fdata.change_addr_order = [];
            lo_fdata.new_user_order = [];
            lo_fdata.reject_order = [];
            lo_fdata.confirm_order = [];
            lo_fdata.delivering_order = [];
            lo_fdata.complete_order = [];
            lo_fdata.drivers = [];
           // var ia_drivers = [];
            _.forEach( lo_data.orders, function(order, key) {
              // console.log(order, key);
                switch(order.status) {
                  case '0':
                      lo_fdata.new_order.push(order)
                      break;
                  case '60':
                       lo_fdata.change_addr_order.push(order)
                      break;
                  case '5':
                       lo_fdata.reject_order.push(order)
                      break;
                  case '90':
                       lo_fdata.reject_order.push(order)
                      break;
                  case '55':
                       lo_fdata.new_user_order.push(order)
                      break;
                  case '10':
                      lo_fdata.confirm_order.push(order)
                      break;
                  case '20':
                       lo_fdata.delivering_order.push(order)
                      break;
                  case '30':
                       lo_fdata.delivering_order.push(order)
                      break;
                  case '40':
                       lo_fdata.complete_order.push(order)
                      break; 
                }
            }); 
            
            
            _.forEach(lo_fdata.delivering_order,function(order) {
               var driver_index = _.findIndex(lo_fdata.drivers, function(driver) {
                  return driver.deliver == order.deliver;
                });
               // console.log('driver',driver_index)
                if(driver_index == '-1'){
                    var driver = {}
                    driver.deliver = order.deliver;
                    driver.orders = [];
                    driver.orders.push(order)
                    lo_fdata.drivers.push(driver)
                }else{
                    lo_fdata.drivers[driver_index].orders.push(order)
                }
            }); 



             //如有需要克服介入的单 播放声音
            if(lo_fdata.new_order.length + lo_fdata.change_addr_order.length + lo_fdata.new_user_order.length > 0){
                play_audio()
            } 

        };
    };

    dashboardService.get_orders = function  () {
    		if (lo_data.statas !== null){
    			console.log("lo_data in service",lo_data)
    			return lo_data;
    		}
    }
    dashboardService.get_fomat = function  () {
    	if (lo_fdata.statas !== null){
    		return lo_fdata;
    	}
    	
    }
	var audio = new Audio('audio/pikapi.wav');
	function play_audio () {
	    audio.play();
	}
  return dashboardService
})

angular.module('MetronicApp')
.controller('DashboardController', function($rootScope, $scope, $http, $timeout,$interval,$modal,$log,auth,API_URL) {
    var DashCtrl = this;
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });
    // auth.login("kathy","liangliang");
    auth.authenticaton();

    DashCtrl.h = window.innerHeight*0.8;
    DashCtrl.h2 = window.innerHeight*0.8*0.5;
    console.log("height",DashCtrl.h2);
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = true;
    
    DashCtrl.openOrderChange = function (oid,port,c_addr) {
      var size = 'lg'
      var eo_data = {};
      eo_data.oid = oid;
      eo_data.c_addr = c_addr;
      eo_data.type = "order"
      if (port == 1) {
        eo_data.port = "csnew";
      };
      if (port == 2) {
        eo_data.port = "csdlexp";
      };
      if (port == 3) {
        eo_data.port = "csorderchange";
      };

      DashCtrl.openPopup(size,eo_data);
      
      
    };
    DashCtrl.openMap = function (oid,c_lat,c_lng,r_lat,r_lng,c_addr) {
    	// r_addr,c_addr
      var size = 'lg'
      var eo_data = {};
      eo_data.c_lat = c_lat;
      eo_data.c_lng = c_lng;
      eo_data.r_lat = r_lat;
      eo_data.r_lng = r_lng;
      eo_data.oid   = oid;
      eo_data.c_addr = c_addr;
      // eo_data.r_addr= r_addr;
      // eo_data.c_addr=c_addr;
      eo_data.type = "maps";
      DashCtrl.openPopup(size,eo_data);
      
      
    };

    DashCtrl.openPopup = function (size,eo_data) {
      var modalInstance = $modal.open(
      {
          templateUrl: 'views/orderChange.html',
          controller: 'OrderChangeCtrl as occ',
          size: size,
          resolve:
          {
              data: function()
              {
                  return eo_data;
              }
          }
      });
          
      modalInstance.result.then(function()
      {
        // promise 成功完成后call get orders 刷新数据
         get_orders()
      }, function()
      {
          $log.info('Modal dismissed at: ' + new Date());
      });
    }


    DashCtrl.drivers = []; 
    function get_orders() {
        $http({
          method: 'GET',
          url: API_URL+'MobMonitor/OrderList',
        }).then(function successCallback(response) {
            console.log(response)
            DashCtrl.orders = response.data.ea_orders;
            DashCtrl.statas = response.data.ea_stats;
             setOrders();
             //dashboardService.save(DashCtrl.orders);
          }, function errorCallback(response) {
           // alertService.alert(response);
        });

        //order test 2015/01/21
        // DashCtrl.orders = $scope.data.ea_orders
        // DashCtrl.statas = $scope.data.ea_stats;
        // console.log(DashCtrl.statas)
        // setOrders();
        //order test end

        function setOrders() {

            DashCtrl.new_order = [];
            DashCtrl.change_addr_order = [];
            DashCtrl.new_user_order = [];
            DashCtrl.reject_order = [];
            DashCtrl.confirm_order = [];
            DashCtrl.delivering_order = [];
            DashCtrl.complete_order = [];
            DashCtrl.drivers = [];
           var ia_drivers = [];
            _.forEach( DashCtrl.orders, function(order, key) {
              // console.log(order, key);
                switch(order.status) {
                  case '0':
                      DashCtrl.new_order.push(order)
                      break;
                  case '60':
                       DashCtrl.change_addr_order.push(order)
                      break;
                  case '5':
                       DashCtrl.reject_order.push(order)
                      break;
                  case '90':
                       DashCtrl.reject_order.push(order)
                      break;
                  case '55':
                       DashCtrl.new_user_order.push(order)
                      break;
                  case '10':
                      DashCtrl.confirm_order.push(order)
                      break;
                  case '20':
                       DashCtrl.delivering_order.push(order)
                      break;
                  case '30':
                       DashCtrl.delivering_order.push(order)
                      break;
                  case '40':
                       DashCtrl.complete_order.push(order)
                      break; 
                }
            }); 
            
            
            _.forEach(DashCtrl.delivering_order,function(order) {
               var driver_index = _.findIndex(DashCtrl.drivers, function(driver) {
                  return driver.deliver == order.deliver;
                });
               // console.log('driver',driver_index)
                if(driver_index == '-1'){
                    var driver = {}
                    driver.deliver = order.deliver;
                    driver.orders = [];
                    driver.orders.push(order)
                    DashCtrl.drivers.push(driver)
                }else{
                    DashCtrl.drivers[driver_index].orders.push(order)
                }
            }); 

             //如有需要克服介入的单 播放声音
            if(DashCtrl.new_order.length + DashCtrl.change_addr_order.length + DashCtrl.new_user_order.length > 0){
                play_audio()
            } 

        };
    };


    $interval(function() { 
        get_orders();
    },30000)
       
    get_orders();

	var audio = new Audio('audio/pikapi.wav');
    function play_audio () {
        audio.play();
    }
   
   

});
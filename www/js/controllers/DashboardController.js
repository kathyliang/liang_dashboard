angular.module('MetronicApp').controller('DashboardController', function($rootScope, $scope, $http, $timeout,$interval,auth,API_URL) {
    var DashCtrl = this;
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });
    auth.login("kathy","liangliang");
    auth.authenticaton();

    DashCtrl.h = window.innerHeight*0.8;
    DashCtrl.h2 = window.innerHeight*0.8*0.5;
    console.log("height",DashCtrl.h2);
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = true;
    
    DashCtrl.hello = "hello";
    function get_orders() {
        $http({
          method: 'GET',
          url: API_URL+'MobMonitor/OrderList',
        }).then(function successCallback(response) {
            console.log(response)
            DashCtrl.orders = response.data.ea_orders;
            DashCtrl.statas = response.data.ea_stats;
             setOrders()   
          }, function errorCallback(response) {
           // alertService.alert(response);
          });
        function setOrders() {

            DashCtrl.new_order = [];
            DashCtrl.change_addr_order = [];
            DashCtrl.new_user_order = [];
            DashCtrl.reject_order = [];
            DashCtrl.confirm_order = [];
            DashCtrl.delivering_order = [];
            DashCtrl.complete_order = [];
            DashCtrl.drivers = [];

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
            console.log(DashCtrl.delivering_order) 
            console.log("1", DashCtrl.drivers)
        };
    };


    $interval(function() { 
        get_orders();
    },30000)
    get_orders();
});
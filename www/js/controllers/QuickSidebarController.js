
angular.module('MetronicApp').controller('QuickSidebarController', function($rootScope, $scope, $http, $timeout,$interval) {
    var QuickSidebarController = this;
    // $scope.$on('$viewContentLoaded', function() {   
    //     // initialize core components
    //     App.initAjax();
    // });
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = true;
    
    QuickSidebarController.hello = "hello";
    function get_orders() {
        $http({
          method: 'GET',
          url: 'https://www.chanmao.ca/index.php?r=MobMonitor/OrderList',
          headers: {
           'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDYxMSIsImV4cGlyZWQiOjE0NTQzMDE3ODd9.Zanu0l3LW31UlGZ72PXbcBUDPGOstKai2oMYiX4ab_Y'
         },
        }).then(function successCallback(response) {
            console.log(response)
            QuickSidebarController.orders = response.data.ea_orders;
            QuickSidebarController.statas = response.data.ea_stats;
             setOrders()   
          }, function errorCallback(response) {
           // alertService.alert(response);
          });
        function setOrders() {

            QuickSidebarController.new_order = [];
            QuickSidebarController.change_addr_order = [];
            QuickSidebarController.new_user_order = [];
            QuickSidebarController.reject_order = [];
            QuickSidebarController.confirm_order = [];
            QuickSidebarController.delivering_order = [];
            QuickSidebarController.complete_order = [];
            QuickSidebarController.drivers = [];

            _.forEach( QuickSidebarController.orders, function(order, key) {
              // console.log(order, key);
                switch(order.status) {
                  case '0':
                      QuickSidebarController.new_order.push(order)
                      break;
                  case '60':
                       QuickSidebarController.change_addr_order.push(order)
                      break;
                  case '5':
                       QuickSidebarController.reject_order.push(order)
                      break;
                  case '55':
                       QuickSidebarController.new_user_order.push(order)
                      break;
                  case '10':
                      QuickSidebarController.confirm_order.push(order)
                      break;
                  case '20':
                       QuickSidebarController.delivering_order.push(order)
                      break;
                  case '30':
                       QuickSidebarController.delivering_order.push(order)
                      break;
                  case '40':
                       QuickSidebarController.complete_order.push(order)
                      break; 
                }
            }); 
            
            _.forEach(QuickSidebarController.delivering_order,function(order) {
               var driver_index = _.findIndex(QuickSidebarController.drivers, function(driver) {
                  return driver.deliver == order.deliver;
                });
               // console.log('driver',driver_index)
                if(driver_index == '-1'){
                    var driver = {}
                    driver.deliver = order.deliver;
                    driver.orders = [];
                    driver.orders.push(order)
                    QuickSidebarController.drivers.push(driver)
                }else{
                    QuickSidebarController.drivers[driver_index].orders.push(order)
                }
            });  
            console.log(QuickSidebarController.delivering_order) 
            console.log("1", QuickSidebarController.drivers)
        };
    };


    $interval(function() { 
        get_orders();
    },30000)
    get_orders();
});
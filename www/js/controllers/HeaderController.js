
angular.module('MetronicApp').controller('HeaderController', function($rootScope, $scope, $http, $timeout,$interval,auth) {
    var HeaderController = this;
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = true;
    
    HeaderController.hello = "hello";
    // function get_orders() {
    //     $http({
    //       method: 'GET',
    //       url: 'https://www.chanmao.ca/index.php?r=MobMonitor/OrderList',
    //       headers: {
    //        'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDYxMSIsImV4cGlyZWQiOjE0NTQzMDE3ODd9.Zanu0l3LW31UlGZ72PXbcBUDPGOstKai2oMYiX4ab_Y'
    //      },
    //     }).then(function successCallback(response) {
    //         console.log(response)
    //         HeaderController.orders = response.data.ea_orders;
    //         HeaderController.statas = response.data.ea_stats;
    //          setOrders()   
    //       }, function errorCallback(response) {
    //        // alertService.alert(response);
    //       });
    //     function setOrders() {

    //         HeaderController.new_order = [];
    //         HeaderController.change_addr_order = [];
    //         HeaderController.new_user_order = [];
    //         HeaderController.reject_order = [];
    //         HeaderController.confirm_order = [];
    //         HeaderController.delivering_order = [];
    //         HeaderController.complete_order = [];
    //         HeaderController.drivers = [];

    //         _.forEach( HeaderController.orders, function(order, key) {
    //           // console.log(order, key);
    //             switch(order.status) {
    //               case '0':
    //                   HeaderController.new_order.push(order)
    //                   break;
    //               case '60':
    //                    HeaderController.change_addr_order.push(order)
    //                   break;
    //               case '5':
    //                    HeaderController.reject_order.push(order)
    //                   break;
    //               case '55':
    //                    HeaderController.new_user_order.push(order)
    //                   break;
    //               case '10':
    //                   HeaderController.confirm_order.push(order)
    //                   break;
    //               case '20':
    //                    HeaderController.delivering_order.push(order)
    //                   break;
    //               case '30':
    //                    HeaderController.delivering_order.push(order)
    //                   break;
    //               case '40':
    //                    HeaderController.complete_order.push(order)
    //                   break; 
    //             }
    //         }); 
            
    //         _.forEach(HeaderController.delivering_order,function(order) {
    //            var driver_index = _.findIndex(HeaderController.drivers, function(driver) {
    //               return driver.deliver == order.deliver;
    //             });
    //            // console.log('driver',driver_index)
    //             if(driver_index == '-1'){
    //                 var driver = {}
    //                 driver.deliver = order.deliver;
    //                 driver.orders = [];
    //                 driver.orders.push(order)
    //                 HeaderController.drivers.push(driver)
    //             }else{
    //                 HeaderController.drivers[driver_index].orders.push(order)
    //             }
    //         });  
    //         console.log(HeaderController.delivering_order) 
    //         console.log("1", HeaderController.drivers)
    //     };
    // };


    // $interval(function() { 
    //     get_orders();
    // },30000)
    HeaderController.logout = function() {
        auth.logout()
    };
    // get_orders();
});
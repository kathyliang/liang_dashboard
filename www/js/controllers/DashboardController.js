angular.module('MetronicApp').controller('DashboardController', function($rootScope, $scope, $http, $timeout,$interval,$modal,$log,auth,API_URL) {
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
    
    DashCtrl.openOrderChange = function (oid,port) {
      var size = 'lg'
      var eo_data = {};
      eo_data.oid = oid;
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
    DashCtrl.openMap = function (oid,c_lat,c_lng,r_lat,r_lng) {
      var size = 'lg'
      var eo_data = {};
      eo_data.c_lat = c_lat;
      eo_data.c_lng = c_lng;
      eo_data.r_lat = r_lat;
      eo_data.r_lng = r_lng;
      eo_data.oid   = oid;
      eo_data.type = "maps"
      console.log("hhahahaha",eo_data.oid)
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
          
      modalInstance.result.then(function(selectedItem)
      {
          $scope.selected = selectedItem;
          console.log(selectedItem)
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
            // DashCtrl.drivers = [];
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
            
            // _.forEach(DashCtrl.delivering_order,function(order) {
            //    var driver_index = _.findIndex(ia_drivers, function(driver) {
            //       return driver.deliver == order.deliver;
            //     });
            //    // console.log('driver',driver_index)
            //     if(driver_index == '-1'){
            //         var driver = {}
            //         driver.deliver = order.deliver;
            //         driver.orders = [];
            //         driver.orders.push(order)
            //         ia_drivers.push(driver)
            //     }else{
            //         ia_drivers[driver_index].orders.push(order)
            //     }
            // });  
            // // console.log(DashCtrl.delivering_order) 
            // console.log("1", ia_drivers)
            // // 
            // if(DashCtrl.drivers.length == 0){
            //     DashCtrl.drivers = ia_drivers;
            // }else{
            //     // DashCtrl.drivers == ia_drivers;
            //     _.forEach(ia_drivers,function (driver) {
            //         console.log("2",driver);
            //         var driver_index = _.findIndex(DashCtrl.drivers, function(d_driver) {
            //            return d_driver.deliver == driver.deliver;

            //          });
            //         if (driver_index == -1){
            //             DashCtrl.drivers.push(driver);
            //         }else{
            //             _.forEach(driver.orders,function (l_order) {
            //                 console.log("4",l_order);
            //                 var order_index = _.findIndex(DashCtrl.drivers[driver_index].orders, function(d_order) {
            //                     return d_order.oid == l_order.oid;
            //                 });
            //                 if (order_index == -1) {
            //                    DashCtrl.drivers[driver_index].orders.push(l_order);
            //                 };
            //             })

            //         }
            //     });
            //     _.forEach(DashCtrl.drivers,function (driver) {
            //         console.log("11",driver);
            //         var driver_ind = _.findIndex(ia_drivers, function(d_driver) {
            //            return d_driver.deliver == driver.deliver;

            //          });
            //         if (driver_ind == -1){
            //             var remove_driver = _.findIndex(DashCtrl.drivers, function(d_driver) {
            //                return d_driver.deliver == driver.deliver;

            //              });
            //             DashCtrl.drivers.splice(remove_order, 1);
            //         }else{
            //             _.forEach(driver.orders,function (l_order) {
            //                 console.log("14",l_order);
            //                 var order_ind = _.findIndex(ia_drivers[driver_ind].orders, function(d_order) {
            //                     return d_order.oid == l_order.oid;
            //                 });
            //                 console.log("15",order_ind)
            //                 console.log("16",ia_drivers[driver_ind].orders)
            //                 console.log("17",DashCtrl.drivers[driver_ind].orders)
            //                 if (order_ind == -1) {
            //                     var remove_order = _.findIndex(DashCtrl.drivers[driver_ind].orders, function(d_order) {
            //                         return d_order.oid == l_order.oid;
            //                     });
            //                    DashCtrl.drivers[driver_ind].orders.splice(remove_order, 1);
            //                 };
            //             })
                        
            //         }
            //     });
            // }
            _.forEach(DashCtrl.delivering_order,function(order) {
              console.log("delivering_order",DashCtrl.delivering_order);
              console.log("drivers",ia_drivers);
              var driver_index = _.findIndex(ia_drivers, function(driver) {
                 return driver.deliver == order.deliver;
                 console.log("driver111",driver);
                 console.log("111",driver_index);
               });
              console.log("driver111",driver);
              // console.log('driver',driver_index)
               if(driver_index == '-1'){
                   var lo_driver = {}
                   lo_driver.deliver = order.deliver;
                   lo_driver.orders = [];
                   lo_driver.orders.push(order)
                   ia_drivers.push(lo_driver)
               }else{
                   ia_drivers[driver_index].orders = driver.orders;
               }
           }); 


        };
    };


    $interval(function() { 
        get_orders();
    },30000)
    get_orders();

});
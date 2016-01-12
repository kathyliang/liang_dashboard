
angular.module('MetronicApp').controller('HeaderController', function($rootScope, $scope, $http, $location,$timeout,$interval,$modal, $log,AlertService,auth) {

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

    function get_orders() {
        $http({
          method: 'GET',
          url: 'https://www.chanmao.ca/index.php?r=MobMonitor/OrderList',
          headers: {
           'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDYxMSIsImV4cGlyZWQiOjE0NTQzMDE3ODd9.Zanu0l3LW31UlGZ72PXbcBUDPGOstKai2oMYiX4ab_Y'
          },
        }).then(function successCallback(response) {
            console.log(response)
            HeaderController.orders = response.data.ea_orders;
            HeaderController.statas = response.data.ea_stats;
             setOrders()   
          }, function errorCallback(response) {
           // alertService.alert(response);
          });
    };
    function setOrders() {

        HeaderController.new_order = [];
        HeaderController.change_addr_order = [];
        HeaderController.new_user_order = [];
        HeaderController.reject_order = [];
        HeaderController.confirm_order = [];
        HeaderController.delivering_order = [];
        HeaderController.complete_order = [];
        HeaderController.drivers = [];

        _.forEach( HeaderController.orders, function(order, key) {
          // console.log(order, key);
            switch(order.status) {
              case '0':
                  HeaderController.new_order.push(order)
                  break;
              case '60':
                   HeaderController.change_addr_order.push(order)
                  break;
              case '5':
                   HeaderController.reject_order.push(order)
                  break;
              case '55':
                   HeaderController.new_user_order.push(order)
                  break;
              case '10':
                  HeaderController.confirm_order.push(order)
                  break;
              case '20':
                   HeaderController.delivering_order.push(order)
                  break;
              case '30':
                   HeaderController.delivering_order.push(order)
                  break;
              case '40':
                   HeaderController.complete_order.push(order)
                  break; 
            }
        }); 
        
        _.forEach(HeaderController.delivering_order,function(order) {
            var driver_index = _.findIndex(HeaderController.drivers, function(driver) {
              return driver.deliver == order.deliver;
            });
            // console.log('driver',driver_index)
            if(driver_index == '-1'){
                var driver = {}
                driver.deliver = order.deliver;
                driver.orders = [];
                driver.orders.push(order)
                HeaderController.drivers.push(driver)
            }else{
                HeaderController.drivers[driver_index].orders.push(order)
            }
        });  
        console.log(HeaderController.delivering_order) 
        console.log("1", HeaderController.drivers)
    };



    $interval(function() { 
        get_orders();
       
    },30000)

    get_orders();
    get_notes();


    HeaderController.showAlert = function  () {
      
    }
    function get_notes() {
        $http({
          method: 'GET',
          url: 'https://chanmao.ca/index.php?r=MobMonitor/CsLoad',
          
        }).then(function successCallback(response) {
            console.log("111111111",response)
            HeaderController.notes = response.data.ea_cate; 
            console.log("22222",response)
          }, function errorCallback(response) {
           // alertService.alert(response);
          });
    };
    function post_notes (data) {
        var CsNotes = {};
        CsNotes.cate = data.cate;
        CsNotes.oid = data.oid;
        CsNotes.tel = data.tel;
        CsNotes.notes = data.notes;
        // cate , oid, tel, notes
        console.log(data)

        $http({
          method: 'POST',
          url: 'https://chanmao.ca/index.php?r=MobMonitor/CsNotes',
          headers: {
           'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDYxMSIsImV4cGlyZWQiOjE0NTQzMDE3ODd9.Zanu0l3LW31UlGZ72PXbcBUDPGOstKai2oMYiX4ab_Y'
          },
          data:CsNotes
        })  .then(function successCallback(response) {
              
              
              var data = response.data
              console.log('success:',data)

            }, function errorCallback(response) {
              
              console.log('error:',response)

            });

      };
     //$scope.data = HeaderController.notes;
      
      $scope.open = function(size){
          var modalInstance = $modal.open(
          {
              templateUrl: 'views/alert.html',
              controller: 'AlertController as ac',
              size: size,
              resolve:
              {
                  data: function()
                  {
                      return HeaderController.notes;
                  }
              }
          });
          
          modalInstance.result.then(function(notes_data)
          {
              $scope.data = notes_data;
              console.log("notes_data",notes_data)
              post_notes($scope.data);
          }, function()
          {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };
      HeaderController.logout = function() {
        console.log("log out");
          auth.logout()
      };

});
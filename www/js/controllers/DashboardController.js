
angular.module('MetronicApp').controller('DashboardController', function(dashboardService,$rootScope, $scope, $http, $timeout,$interval,$modal,$log,auth,API_URL) {
    var DashCtrl = this;
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });
    // auth.login("kathy","liangliang");
    auth.authenticaton();
    DashCtrl.h = window.innerHeight*0.8;
    DashCtrl.h2 = window.innerHeight*0.8*0.5;
    // console.log("height",DashCtrl.h2);
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = true;

    $timeout(function() {
        // console.log("get data from dashboard service",dashboardService.get_orders())
        DashCtrl.order_data = dashboardService.get_orders();
        // console.log("test get",DashCtrl.order_data);
        DashCtrl.f_data = dashboardService.get_fomat();
        // console.log("test fomat", DashCtrl.f_data.reject_order);
    }, 1000);
    
   
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
      if (port == 4) {
        eo_data.port = "detail";
        eo_data.type = "showod";
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
          controller: 'popUpCtrl as puc',
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
        // promise 成功完成后call get init 刷新数据
        dashboardService.get_init();
        // console.log("1");
      }, function()
      {
          $log.info('Modal dismissed at: ' + new Date());
      });
    }
});
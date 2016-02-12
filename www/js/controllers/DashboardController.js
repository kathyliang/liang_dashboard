
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
    var drivers_data = [];
    $timeout(function() {
        DashCtrl.order_data = dashboardService.get_orders();
        DashCtrl.f_data = dashboardService.get_fomat();

        // 刷新司机列表
        // console.log("driver",DashCtrl.f_data.drivers);
        // if (drivers_data.length == 0){
        //   drivers_data = DashCtrl.f_data.drivers;
        //   console.log("test fomat", drivers_data.length);
        //   console.log(DashCtrl.f_data.drivers.length);
        // }else{
        //   if(drivers_data.length < DashCtrl.f_data.drivers.length){
        //     var diff = _.difference(drivers_data, DashCtrl.f_data.drivers);
        //     console.log("diff1",diff);
        //   }else if (drivers_data.length = DashCtrl.f_data.drivers.length){
        //     console.log("diff2",diff);
        //   }else{
        //     console.log("diff3",diff);
        //   }

        // }
      //   $timeout(function  () {
      //     var test_data = {
      //     "oid": "43376",
      //     "normal": 1,
      //     "alert": 0,
      //     "warning": 0,
      //     "active": 1,
      //     "status": "20",
      //     "dltype": "送餐",
      //     "channel": "iOS",
      //     "status_txt": "送餐员等待取餐",
      //     "dlexp": "5.00",
      //     "total": "71.56",
      //     "created": "2016-02-08 16:07:15",
      //     "rrname": "浏阳蒸菜(North York)",
      //     "cell": "6478856609",
      //     "c_addr": "33 Singer Court, Toronto",
      //     "c_postal": "M2K 0B4",
      //     "c_lat": "43.769550",
      //     "c_lng": "-79.369850",
      //     "r_addr": "25 Spring Garden Ave, Toronto",
      //     "r_postal": "M2N 3G1",
      //     "r_lat": "43.763069",
      //     "r_lng": "-79.409706",
      //     "accepted": "2016-02-08 16:13:40",
      //     "picked": "0000-00-00 00:00:00",
      //     "completed": "0000-00-00 00:00:00",
      //     "deliver": "DavidWei"}
      //     var test2 = {
      //   "deliver": "DavidWei",
      //   "orders": [{
      //     "oid": "41176",
      //     "normal": 1,
      //     "alert": 0,
      //     "warning": 0,
      //     "active": 1,
      //     "status": "20",
      //     "dltype": "送餐",
      //     "channel": "iOS",
      //     "status_txt": "送餐员等待取餐",
      //     "dlexp": "5.00",
      //     "total": "71.56",
      //     "created": "2016-02-08 16:07:15",
      //     "rrname": "浏阳蒸菜(North York)",
      //     "cell": "6478856609",
      //     "c_addr": "33 Singer Court, Toronto",
      //     "c_postal": "M2K 0B4",
      //     "c_lat": "43.769550",
      //     "c_lng": "-79.369850",
      //     "r_addr": "25 Spring Garden Ave, Toronto",
      //     "r_postal": "M2N 3G1",
      //     "r_lat": "43.763069",
      //     "r_lng": "-79.409706",
      //     "accepted": "2016-02-08 16:13:40",
      //     "picked": "0000-00-00 00:00:00",
      //     "completed": "0000-00-00 00:00:00",
      //     "deliver": "DavidWei"
      //   }, {
      //     "oid": "40175",
      //     "normal": 1,
      //     "alert": 0,
      //     "warning": 0,
      //     "active": 1,
      //     "status": "20",
      //     "dltype": "送餐",
      //     "channel": "iOS",
      //     "status_txt": "送餐员等待取餐",
      //     "dlexp": "3.00",
      //     "total": "58.86",
      //     "created": "2016-02-08 16:06:16",
      //     "rrname": "老灶肉夹馍(North York)",
      //     "cell": "6478656139",
      //     "c_addr": "7 Lorraine Drive, Toronto",
      //     "c_postal": "M2N 7H2",
      //     "c_lat": "43.778702",
      //     "c_lng": "-79.417244",
      //     "r_addr": "15 Northtown Way, North York",
      //     "r_postal": "M2N 7L4",
      //     "r_lat": "43.776337",
      //     "r_lng": "-79.414429",
      //     "accepted": "2016-02-08 16:13:35",
      //     "picked": "0000-00-00 00:00:00",
      //     "completed": "0000-00-00 00:00:00",
      //     "deliver": "DavidWei"
      //   }, {
      //     "oid": "40170",
      //     "normal": 1,
      //     "alert": 0,
      //     "warning": 0,
      //     "active": 1,
      //     "status": "30",
      //     "dltype": "送餐",
      //     "channel": "iOS",
      //     "status_txt": "送餐员开始配送",
      //     "dlexp": "3.00",
      //     "total": "68.47",
      //     "created": "2016-02-08 15:45:45",
      //     "rrname": "浏阳蒸菜(North York)",
      //     "cell": "6478349388",
      //     "c_addr": "2 Anndale Drive, Toronto",
      //     "c_postal": "M2N 0G5",
      //     "c_lat": "43.760464",
      //     "c_lng": "-79.410248",
      //     "r_addr": "25 Spring Garden Ave, Toronto",
      //     "r_postal": "M2N 3G1",
      //     "r_lat": "43.763069",
      //     "r_lng": "-79.409706",
      //     "accepted": "2016-02-08 15:48:14",
      //     "picked": "2016-02-08 16:17:13",
      //     "completed": "0000-00-00 00:00:00",
      //     "deliver": "DavidWei"
      //   }, {
      //     "oid": "40148",
      //     "normal": 1,
      //     "alert": 1,
      //     "warning": 0,
      //     "active": 1,
      //     "status": "20",
      //     "dltype": "送餐",
      //     "channel": "iOS",
      //     "status_txt": "送餐员等待取餐",
      //     "dlexp": "3.00",
      //     "total": "67.92",
      //     "created": "2016-02-08 14:34:23",
      //     "rrname": "粉爱捞粉Sprout(North York)",
      //     "cell": "4166668973",
      //     "c_addr": "5 Sheppard Avenue East, Toronto",
      //     "c_postal": "M2N",
      //     "c_lat": "43.761501",
      //     "c_lng": "-79.409882",
      //     "r_addr": "5 Northtown Way, North York ",
      //     "r_postal": "M2N 7A1",
      //     "r_lat": "43.776337",
      //     "r_lng": "-79.414429",
      //     "accepted": "2016-02-08 15:05:58",
      //     "picked": "0000-00-00 00:00:00",
      //     "completed": "0000-00-00 00:00:00",
      //     "deliver": "DavidWei"
      //   }]
      // }
        
      //     DashCtrl.drivers2.push(test2);
      //     DashCtrl.drivers2[0].orders.push(test_data);
      //   },5000)


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
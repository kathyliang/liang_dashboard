
angular.module('MetronicApp').controller('OrderChangeCtrl', function($scope,$sce, $modalInstance, data) {
    var OrderChangeCtrl = this;
    OrderChangeCtrl.lv_c_addr = data.c_addr;
    if(data.type =="order"){
      var oid = data.oid
      var port = data.port
      OrderChangeCtrl.oid = oid
      OrderChangeCtrl.url= $sce.trustAsResourceUrl("https://www.chanmao.ca/monitor/#/" + port + "/"+ oid +"/e");
    }else if(data.type == "maps"){
      var lv_c_lat  = data.c_lat;
      var lv_c_lng  = data.c_lng;
      var lv_r_lat  = data.r_lat;
      var lv_r_lng  = data.r_lng;
      OrderChangeCtrl.lv_r_addr = data.r_addr;
      var oid = data.oid;
      OrderChangeCtrl.oid = oid;
      console.log("data:",data);
      //tolls test
      // var lv_c_lat = 43.591499;
      // var lv_c_lng = -79.641226;
      // var lv_r_lat = 43.766667;
      // var lv_r_lng = -79.564171;
      //tt end
      OrderChangeCtrl.url= $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/"+
        "directions?"+"&key=AIzaSyByXgKTkpmXMPmodZjyeHJbHe6R0JdcdeY" +
        "&origin="+ lv_r_lat + ',+' + lv_r_lng + 
        "&destination=" + lv_c_lat + ',+' + lv_c_lng + 
        "&mode=driving"+
        "&avoid=tolls"

        );
    }
    // /data=!3m1!4b1!4m4!4m3!2m1!2b1!3e0
   // $scope.items = items;
   //      $scope.selected = {
   //          item: $scope.items[0]
   //      };
        
        $scope.ok = function()
        {
            // $modalInstance.close($scope.selected.item);
            $modalInstance.close();
        };
        
        $scope.cancel = function()
        {
            $modalInstance.dismiss('cancel');
            // window.location.reload();

        };



    
});
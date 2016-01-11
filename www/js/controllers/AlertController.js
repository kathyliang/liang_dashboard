
angular.module('MetronicApp').controller('AlertController', function($scope,$sce, $modalInstance, data) {
    var AlertController = this;
    console.log("1",data);
    if(data.type =="order"){
      var oid = data.oid
      var port = data.port
      AlertController.oid = oid
      AlertController.url= $sce.trustAsResourceUrl("http://chanmao.ca/monitor/#/" + port + "/"+ oid +"/e");
    }else if(data.type == "maps"){
      var lv_c_lat = data.c_lat;
      var lv_c_lng = data.c_lng;
      var lv_r_lat = data.r_lat;
      var lv_r_lng = data.r_lng;

      //tolls test
      // var lv_c_lat = 43.591499;
      // var lv_c_lng = -79.641226;
      // var lv_r_lat = 43.766667;
      // var lv_r_lng = -79.564171;
      //tt end
      AlertController.url= $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/"+
        "directions?"+"&key=AIzaSyByXgKTkpmXMPmodZjyeHJbHe6R0JdcdeY" +
        "&origin="+ lv_r_lat + ',+' + lv_r_lng + 
        "&destination=" + lv_c_lat + ',+' + lv_c_lng + 
        "&mode=driving"+
        "&avoid=tolls"

        );
    }else if(data.length == 2){
      AlertController.notes = data;
      console.log("2",AlertController.notes);
    }
    
    // /data=!3m1!4b1!4m4!4m3!2m1!2b1!3e0
   // $scope.items = items;
   //      $scope.selected = {
   //          item: $scope.items[0]
   //      };


        $scope.ok = function()
        { 
          if ($scope.data.notes == undefined || $scope.data.cate == undefined){

          }  
          if ($scope.data == null){

          }else{
            if ($scope.data.cate == "配送异常"){
              $scope.data.cate = "1";
            }else if ($scope.data.cate == "订单异常"){
              $scope.data.cate = "2";
            }if ($scope.data.oid == undefined){
              $scope.data.oid = null;
            }if ($scope.data.tel == undefined){
              $scope.data.tel = null;
            }
              $modalInstance.close($scope.data);
              $modalInstance.close();
          }
        };
        
        $scope.cancel = function()
        {
            $modalInstance.dismiss('cancel');
        };



    
});
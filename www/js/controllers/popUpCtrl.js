
angular.module('MetronicApp').controller('popUpCtrl', function($scope,$sce, $modalInstance, data) {
    var popUpCtrl = this;
    
    popUpCtrl.lv_c_addr = data.c_addr;
    switch (data.type) {
       case "order":
           order(data)
           break;
       case "maps":
           maps(data)
           break;
       case "od":
           search_orderDetial(data)
           break;
        case "showod":
            orderDetial(data)
            break;
    }
    function order (data) {
        var oid = data.oid
        var port = data.port
        popUpCtrl.oid = oid
        popUpCtrl.url= $sce.trustAsResourceUrl("https://www.chanmao.ca/monitor/#/" + port + "/"+ oid +"/e");
    }
    function maps (data) {
        var lv_c_lat  = data.c_lat;
        var lv_c_lng  = data.c_lng;
        var lv_r_lat  = data.r_lat;
        var lv_r_lng  = data.r_lng;
        popUpCtrl.lv_r_addr = data.r_addr;
        var oid = data.oid;
        popUpCtrl.oid = oid;
        console.log("data:",data);
      
        popUpCtrl.url= $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/"+
            "directions?"+"&key=AIzaSyByXgKTkpmXMPmodZjyeHJbHe6R0JdcdeY" +
            "&origin="+ lv_r_lat + ',+' + lv_r_lng + 
            "&destination=" + lv_c_lat + ',+' + lv_c_lng + 
            "&mode=driving"+
            "&avoid=tolls"

        );
    }
        
    function orderDetial (argument) {
        var oid = data.oid
        var port = data.port
        popUpCtrl.oid = oid
        popUpCtrl.url= $sce.trustAsResourceUrl("https://www.chanmao.ca/monitor/#/" + port + "/"+ oid);
    }
    function search_orderDetial (argument) {
        popUpCtrl.oid     = data.oid;
        popUpCtrl.cell    = data.cell;
        popUpCtrl.dltype  = data.dltype;
        popUpCtrl.rrname  = data.rrname;
        popUpCtrl.total   = data.total;
        popUpCtrl.dlexp   = data.dlexp;
        popUpCtrl.status_txt  = data.status_txt;
        popUpCtrl.channel = data.channel;
        popUpCtrl.created = data.created;
        popUpCtrl.deliver = data.deliver;
    }
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
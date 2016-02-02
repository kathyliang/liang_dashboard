
angular.module('MetronicApp').controller('NotesController', function($scope,$sce, $modalInstance, data) {
    var NotesController = this;
    NotesController.notes = data;
    // console.log("NotesController",NotesController.notes)
    $scope.ok = function()
    { 
      if ($scope.data == null){
        alert("请填写备注");
      }
      else if ($scope.data.notes == undefined || $scope.data.cate == undefined){
        alert("请填写备注");
      }  
      else{
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
      // console.log("notes",$scope.data);
    };
    
    $scope.cancel = function()
    {
        $modalInstance.dismiss('cancel');
    };



    
});
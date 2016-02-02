
angular.module('MetronicApp').controller('HeaderController', function(dashboardService,$rootScope, $scope, $http, $location,$timeout,$interval,$modal, $log,AlertService,auth,dashboardService) {
    var HeaderController = this;
    // var ll = dashboardService.get();
   
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = true;
    
    $timeout(function() {
        HeaderController.order_data = dashboardService.get_orders();
        
    }, 1000);
    get_notes();
    function get_notes() {
        $http({
          method: 'GET',
          url: 'https://www.chanmao.ca/index.php?r=MobMonitor/CsLoad',
          
        }).then(function successCallback(response) {
            
            HeaderController.notes = response.data.ea_cate; 
            
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
        // console.log(data)

        $http({
          method: 'POST',
          url: 'https://www.chanmao.ca/index.php?r=MobMonitor/CsNotes',
          headers: {
           'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDYxMSIsImV4cGlyZWQiOjE0NTQzMDE3ODd9.Zanu0l3LW31UlGZ72PXbcBUDPGOstKai2oMYiX4ab_Y'
          },
          data:CsNotes
        })  .then(function successCallback(response) {
              
              
              var data = response.data
              // console.log('success:',data)

            }, function errorCallback(response) {
              
              // console.log('error:',response)

            });

    };
      
    $scope.open = function(size){
        var modalInstance = $modal.open(
        {
            templateUrl: 'views/notes.html',
            controller: 'NotesController as nc',
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
            // console.log("notes_data",notes_data)
            post_notes($scope.data);
        }, function()
        {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    HeaderController.logout = function() {
    // console.log("log out");
        auth.logout()
    };

});
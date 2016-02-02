angular.module('MetronicApp').controller('QuickSidebarController', function(dashboardService,$rootScope, $scope, $http, $timeout,$interval) {
    var QuickSidebarController = this;
    // $scope.$on('$viewContentLoaded', function() {   
    //     // initialize core components
    //     App.initAjax();
    // });
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = true;
    
    QuickSidebarController.hello = "hello";
    $timeout(function() {
        QuickSidebarController.f_data = dashboardService.get_fomat();
    }, 1000);
  
});
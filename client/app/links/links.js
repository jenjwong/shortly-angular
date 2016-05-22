angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links, Auth) {

 $scope.data = {
 };


 $scope.signout = function() {
   console.log('calledsignout')
   Auth.signout();
 }

  $scope.init = function () {
    Links.getAll()
    .then(function(links) {
      console.log(links);
      $scope.data.links = links;
    })
    .catch(function(err) {
      console.log(err);
    });


  };

  $scope.init();


});

angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {

 $scope.data = {
 };


 $scope.data.links = [
  // { links: 'Ari'},
  // { links: 'Q'},
  // { links: 'Sean'},
  // { links: 'Anand'}
];

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

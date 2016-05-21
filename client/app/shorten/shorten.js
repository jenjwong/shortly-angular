angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here


  $scope.link = {
  link: ""
  };

  $scope.addLink = function () {
    console.log('you added a link yaya!!')
    $scope.loading = true;
    var link = $scope.link;
    Links.addOne({'url': link})
      .then(function () {
        $scope.loading = false;
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
    };
  });

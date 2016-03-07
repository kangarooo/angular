var app = angular.module('firstApp', []);

  app.controller('UserController', function($rootScope){
    var vm = this;


    vm.user = '';
    vm.messege = '';

    vm.setStatus = function() {
      console.log('Sending user status')
      console.log(JSON.stringify())
      $rootScope.$broadcast('set-status', {
        user: vm.user,
        messege: vm.messege
      });
    }
});


app.controller('StatusController', function ($rootScope){
  var vm = this;


  vm.statuses = [];

});

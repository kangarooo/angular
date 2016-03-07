var app = angular.module('firstApp', []);

  app.controller('UserController', function($rootScope){
    var vm = this;


    vm.user = '';
    vm.messege = '';

    vm.setStatus = function() {
      var _userToSend ={
        user: vm.user,
        messege: vm.messege
      };

      console.log('Sending user status:');
      console.log(JSON.stringify(_userToSend));

      $rootScope.$broadcast('set-status', _userToSend);
    }
});


app.controller('StatusController', function ($rootScope){
  var vm = this;


  vm.statuses = [];

});

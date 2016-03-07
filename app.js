var app = angular.module('firstApp', []);

var _statuses = [];

  app.controller('UserController', function(){


    var vm = this;

__resetForm();


vm.setStatus = _setStatus;

    vm.setStatus = function() {
      var _newStatus = {
        user: vm.user,
        messege: vm.messege

      };

        console.log('Sending user status:');
        console.log(JSON.stringify(_userToSend));


        _statuses.push(_newStatus);

        __resetForm();
    }


function __resetForm() {

      vm.user = '';
      vm.messege = '';

}
});

app.controller('StatusController', function ($rootScope){
  var vm = this;


  vm.statuses = _statuses;

});

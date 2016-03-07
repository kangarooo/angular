var app = angular.module('firstApp', []);

var _statuses = [];

  app.controller('UserController', function(){


    var vm = this;

__resetForm();


vm.setStatus = _setStatus;

function _setStatus(){
  var _newStatus = {
    user: vm.user,
    messege : vm.messege
  }


        console.log('Sending user status:');
        console.log(JSON.stringify(_newStatus));


        _statuses.push(_newStatus);

        __resetForm();
    }


function __resetForm(){

      vm.user = '';
      vm.messege = '';
}
});

app.controller('StatusController', function (){
  var vm = this;


  vm.statuses = _statuses;

});

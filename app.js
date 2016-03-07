var app = angular.module('firstApp', []);

var _statuses = [];


app.service('StatusService', function (){
  var service = this;

  // service.statuses = [];

  var _statuses = [];

  service.addStatus = function(newStatus) {
    _statuses.push(newStatus);
  }

});

  app.controller('UserController', function(StatusService){


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


        StatusService.statuses.push(_newStatus);

        __resetForm();
    }


function __resetForm(){

      vm.user = '';
      vm.messege = '';
}
});

app.controller('StatusController', function (StatusService){
  var vm = this;


  vm.statuses = StatusService.statuses;

});

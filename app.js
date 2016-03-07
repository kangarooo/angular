var app = angular.module('firstApp', []);


app.service('StatusService', function (){
  var service = this;

  // service.statuses = [];

  var _statuses = [];
  var _UserStatuses = [];

  service.addStatus = function(newStatus) {
    if (!!newStatus.user && !!newStatus.message) {
    _statuses.push(newStatus);

    _UserStatuses.splice(0);
    angular.copy(_statuses, _UserStatuses);
  } else {
    alert('User must be defined.');
  }
}

service.getStatuses = function () {
  return _UserStatuses;
}
});

  app.controller('UserController', function(StatusService){

// idea of what should happen

    var vm = this;

_resetForm();


vm.setStatus = _setStatus;

// implementation

function _setStatus(){
  var _newStatus = {
    user: vm.user,
    message : vm.message
  }


        console.log('Sending user status:');
        console.log(JSON.stringify(_newStatus));


        StatusService.addStatus(_newStatus);

        _resetForm();
    }


function _resetForm(){

      vm.user = '';
      vm.message = '';
}
});

app.controller('StatusController', function (StatusService){
  var vm = this;


  vm.getStatuses = StatusService.getStatuses();

});

var app = angular.module('firstApp', []);


app.service('UserService', function (){
  var service = this;

  var _user = {
    username: undefined,
    password: undefined
  };

  service.setUser = _setUser {
    _user.username = username;

  };

  service.getUsername = function () {
    return _user.username;
  };

  service.hasUser = function () {
    return !_.isUndefined(_user.username);
  }

  function _getUsername() {
    return _user.username;
  }
})

app.service('StatusService', function () {
    var service = this;

    var _statuses = [];
    var _userStatuses = [];

    service.addStatus = function(newStatus) {
        if (!_.isEmpty(newStatus.user) && !_.isEmpty(newStatus.message)) {
            _statuses.push(newStatus);

            _userStatuses.splice(0);
            angular.copy(_statuses, _userStatuses);
        } else {
            console.log('User and message must be defined.');
        }
    }

    service.getStatuses = function () {
        return _userStatuses;
    }
});

app.controller('UserController', function (StatusService) {
    // idea of what should hapen
    var vm = this;

    _resetForm();

    vm.setStatus = _setStatus;

    //implementation

    function _setStatus() {
        var __newStatus = {
            user: vm.user,
            message: vm.message,
            date: vm.date
        };

        console.log('Sending user status:');
        console.log(JSON.stringify(__newStatus));

        StatusService.addStatus(__newStatus);

        _resetForm();
    }

    function _resetForm() {
        vm.user = '';
        vm.message = '';
        vm.date = new Date();
    }
});

app.controller('StatusController', function (StatusService) {
    var vm = this;

    vm.statuses = StatusService.getStatuses();
});

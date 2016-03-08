var app = angular.module('firstApp', []);

app.service('UserService', function () {
    var service = this;

    var USERNAME_KEY = 'username';

    var _user = {
        username: localStorage.getItem(USERNAME_KEY),
        //TODO: implement password support in the future
        password: undefined
    };

    service.setUser = _setUser;
    service.removeUser = _removeUser;
    service.getUsername = _getUsername;
    service.hasUser = _hasUser;

    function _setUser(username) {
        _user.username = username;

        if (_.isNull(username)) {
<<<<<<< Updated upstream
           localStorage.removeItem(USERNAME_KEY);
        } else {
            localStorage.setItem(USERNAME_KEY, username);
        }
=======
          localStorage.removeItem(USERNAME_KEY);
        } else {
        localStorage.setItem(USERNAME_KEY, username);
      }
>>>>>>> Stashed changes
    }

    function _removeUser() {
        _setUser(null);
    }

    function _hasUser() {
        return !_.isNull(_getUsername());
    }

    function _getUsername() {
        return _user.username;
    }
});

app.service('StatusService', function () {
    var service = this;

    var _statuses = [];
    var _userStatuses = [];

    service.addStatus = function (newStatus) {
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

app.controller('MainController', function (UserService) {
    var vm = this;

    vm.hasUser = UserService.hasUser;
    vm.getUsername = UserService.getUsername;
    vm.removeUser = UserService.removeUser;
});

app.controller('LoginController', function (UserService) {
    var vm = this;

    vm.username = '';

    vm.login = _login;

    function _login() {
        UserService.setUser(vm.username);
    }
});

app.controller('UserController', function (UserService, StatusService) {
    // idea of what should hapen
    var vm = this;

    _resetForm();

    vm.setStatus = _setStatus;

    //implementation

    function _setStatus() {
        var __newStatus = {
            user: UserService.getUsername(),
            message: vm.message,
            date: vm.date
        };

        console.log('Sending user status:');
        console.log(JSON.stringify(__newStatus));

        StatusService.addStatus(__newStatus);

        _resetForm();
    }

    function _resetForm() {
        vm.message = '';
        vm.date = new Date();
    }
});

app.controller('StatusController', function (StatusService) {
    var vm = this;

    vm.statuses = StatusService.getStatuses();
});

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

          localStorage.removeItem(USERNAME_KEY);
        } else {
        localStorage.setItem(USERNAME_KEY, username);
      }

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

app.service('StatusService', function ($http, $timeout) {
    var service = this;


    var SERVER_URL = 'http://10.0.1.86:8080/statuses';

    var _statuses = [];
    var _userStatuses = [];
    var _users = [];


    service.getStatuses = _getStatuses;
    service.addStatus = _addStatus;
    service.getUsers = _getUsers;


    init();

    function init() {
        var _getRequest = {
            method: 'GET',
            url: SERVER_URL
        };

        $http(_getRequest).then(function (res) {
            _statuses = res.data;

            _updateUsers();

            $timeout(init, 100);
        });
    }

    function _getStatuses() {
        return _userStatuses;
    }

    function _addStatus(newStatus) {
        if (!_.isEmpty(newStatus.user) && !_.isEmpty(newStatus.message)) {
            var _postRequest = {
                method: 'POST',
                url: SERVER_URL,
                data: newStatus
            };

            $http(_postRequest).then(__updateStatuses);

            function __updateStatuses(res) {
                if (!!res) {
                    _statuses.push(res.data);


                    _updateUsers();
                }

            }
        } else {

            console.log('User and message must be defined.');
        }
    }


    function _getUsers() {
        return _users;
    }

    function _updateUsers() {
        _userStatuses.splice(0);
        var _sortedStatuses = _.sortBy(_statuses, 'date');
        angular.copy(_sortedStatuses.reverse(), _userStatuses);

        _users.splice(0);
        var userNames = _.uniq(_.map(_statuses, 'user'));

        _.each(userNames, function getUserStatus(userName) {
            var newUser = {
                name: userName
            };

            var userStatus = _.find(_userStatuses, function(status) {
                return status.user === userName;
            });

            if (!!userName && !!userStatus) {
                newUser.date = userStatus.date;
                newUser.message = userStatus.message;

                _users.push(newUser);

            }


        });
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
            date: new Date()
        };

        console.log('Sending user status:');
        console.log(JSON.stringify(__newStatus));

        StatusService.addStatus(__newStatus);

        _resetForm();
    }

    function _resetForm() {
        vm.message = '';

        // vm.date = new Date();

    }
});

app.controller('StatusController', function (StatusService) {
    var vm = this;


    vm.users = StatusService.getUsers();
});

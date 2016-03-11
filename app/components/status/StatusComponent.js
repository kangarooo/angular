var module_name = 'firstApp.components.status';

var statusModule = angular.module(module_name, []);

statusModule.controller('MfStatusController', function () {

});

statusModule.component('mfStatus', {
    template: require('./status.html'),
    controller: 'MfStatusController',
    controllerAs: 'mfStatusCtrl'
});

module.exports = module_name;
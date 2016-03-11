var module_name = 'firstApp.components.status';

var statusModule = angular.module(module_name, []);

statusModule.controller('MfStatusController', function ($sce, MfDialog) {
    var vm = this;

    var YT_REGEX = /^(http|https):\/\/(youtu\.be\/|((www\.|)youtube\.com\/watch\?v=))([a-zA-Z0-9]+).*$/i;

    vm.isYT = _isYT;
    vm.showYT = _showYT;

    function _isYT(url) {
        return YT_REGEX.test(url);
    }

    function _showYT(url) {
        MfDialog.show({
            template: require('./yt.html'),
            controller: 'YTController',
            controllerAs: 'ytCtrl',
            clickOutsideToClose: true,
            locals: {
                Url: _getYT(url)
            }
        });
    }

    function _getYT(url) {
        var video_id = _.last(YT_REGEX.exec(url));

        var video_url = 'https://youtube.com/embed/' + video_id;
        return $sce.trustAsResourceUrl(video_url);
    }
});

statusModule.component('mfStatus', {
    template: require('./status.html'),
    controller: 'MfStatusController',
    bindings: {
        user: '='
    }
});

module.exports = module_name;
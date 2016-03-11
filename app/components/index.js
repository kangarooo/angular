var module_name = 'firstApp.components';

angular
    .module(module_name, [
        require('./status/StatusComponent')
    ]);

module.exports = module_name;
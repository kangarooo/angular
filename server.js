var _ = require('lodash');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var _statuses = [];

var MESSAGE_LIMIT = 100;

app.use(express.static('app'));

app.get('/statuses', function (req, res) {
    res.json(_statuses);
});

app.post('/statuses', function (req, res) {
    var newStatus = {
        id: _statuses.length,
        user: _.toString(_.get(req.body, 'user')).trim(),
        message: _parseMessage(_.get(req.body, 'message')),
        date: new Date(),
        sendDate: new Date(_.get(req.body, 'date')),
        ip: req.connection.remoteAddress
    };

    if (_validateStatus(newStatus)) {
        console.log('Adding new status:');
        console.log(newStatus);
        _statuses.push(newStatus);
        res.status(201).json(newStatus);
    } else {
        console.error('Received invalid message:');
        console.error(newStatus);
        res.status(404).send('Message was not valid.');
    }

    function _parseMessage(message) {
        var newMessage = _.toString(message);
        var TRUNC = '...';

        if (newMessage.length > MESSAGE_LIMIT) {
            return newMessage.substr(0, MESSAGE_LIMIT - TRUNC.length) + TRUNC;
        } else {
            return newMessage;
        }
    }

    function _validateStatus(status) {
        var isValid = true;

        isValid = isValid && !_.isEmpty(status.user);

        isValid = isValid && !_.isEmpty(status.message);

        isValid = isValid && !_.isNaN(status.sendDate.getTime());

        return isValid;
    }
});

app.listen(8080, function () {
    console.log('Server up and running!');
});
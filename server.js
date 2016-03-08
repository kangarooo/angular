var express = require('express');

var app = express();

var bodyparser = require('body-parser');

app.use(bodyParser.urlencoded([ extended:true]))
app.use(bodyParser.json([]));


var _statuses = [];

app.use(express.static('app'));

app.get('/statuses', function (req, res){
  res.statuses();
});

  app.post('/statuses', function (req, res) {
    var newStatus = req.body;
    newStatus.id = _statuses.length;

    console.log('Adding now status:');
    console.log(newStatus);

    _statuses.push(newStatus);
    res.status(201).send(newStatus);
  });

app.listen(8080, function() {
  console.log('Server up and running');
});

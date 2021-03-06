var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://essec:cergyisc00l@138.68.110.210:27017/admin';




MongoClient.connect(url, function(err, db) { 
console.log("Connected result", err);

    var maraudescontact = db.collection("maraudes-contact");

    var app = express();

    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.use(express.static('client'));

     app.post('/contact/new/', function (req, res) {
        console.log(req.body);
        var data ={
    name : req.body.name,
    email : req.body.email,
    tel : req.body.tel,
    message : req.body.message,
        }
    
        maraudescontact.insert(data
    , function(){
            res.redirect('/submitted.html');
        });
    });

    app.listen(7777, function () {
      console.log('Example app listening on port 7777!')
    });

});
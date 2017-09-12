var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8090;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
global.rootPath = __dirname;
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://rest:rest@ds133054.mlab.com:33054/rest');
var BuildingRoutes = require('./routes/restapi')
var config = require('./config')
var registrationLogin = require('./routes/registrationLogin')
var jwtVerify = require('./routes/jwtVerify')

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//  require('./routes/routes-config')(app);

// app.use(express.static('./public'));
// app.use(function(req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });

//app.use('/api', registrationLogin);
app.use('/r', BuildingRoutes)

app.listen(PORT, function(err) {
    console.log(err || ('running at port ' + PORT));
})
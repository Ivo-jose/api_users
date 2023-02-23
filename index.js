//Imports libs
let bodyParser = require('body-parser');
let express = require('express');
//Others imports
let router = require('./routes/routes');
//Instances
let app = express();

//Configuring express with bodyParse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json())

//call route
app.use('/', router);

//Server
app.listen(8888,() => {
    console.log('Running server');
}) 

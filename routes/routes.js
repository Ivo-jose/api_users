//Imports
let express = require('express');
let HomeController = require('../controllers/HomeController');
//Instances
let app = express();
let router = express.Router();

//call route
router.get('/', HomeController.index);


//Export
module.exports = router;
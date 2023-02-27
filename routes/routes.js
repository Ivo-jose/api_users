//Imports
let express = require('express');
let HomeController = require('../controllers/HomeController');
let UserController = require('../controllers/UserController');
//Instances
let app = express();
let router = express.Router();

//call route
//HOME:
router.get('/', HomeController.index);
//USERS:
router.post('/user', UserController.create);



//Export
module.exports = router;
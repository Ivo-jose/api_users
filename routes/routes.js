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
router.get('/user', UserController.findAll);
router.get('/user/:id', UserController.findById);
router.put('/user/:id', UserController.update);



//Export
module.exports = router;
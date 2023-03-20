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
//post
router.post('/user/login', UserController.login);
router.post('/user', UserController.create);
router.post('/user/recoverPassword', UserController.recoverPassword);
router.post('/user/changePassword',UserController.changePassword);
//get
router.get('/user', UserController.findAll);
router.get('/user/:id', UserController.findById);
//put
router.put('/user/:id', UserController.update);
//delete
router.delete('/user/:id', UserController.delete);



//Export
module.exports = router;
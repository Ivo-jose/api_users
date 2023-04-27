//Imports
let express = require('express');
let HomeController = require('../controllers/HomeController');
let UserController = require('../controllers/UserController');
let AdminAuth = require('../middleware/AdminAuth');
//Instances
let app = express();
let router = express.Router();

//call route
//HOME:
router.get('/', HomeController.index);
router.post('/validate',  AdminAuth.userAuthorization,  HomeController.validate)
//USERS:
//post
router.post('/user/login',  UserController.login);
router.post('/user',  UserController.create);
router.post('/user/recoverPassword', AdminAuth.adminAuthorization,  UserController.recoverPassword);
router.post('/user/changePassword', AdminAuth.adminAuthorization, UserController.changePassword);
//get
router.get('/user', AdminAuth.userAuthorization, UserController.findAll);
router.get('/user/:id', AdminAuth.userAuthorization, UserController.findById);
//put
router.put('/user/:id', AdminAuth.adminAuthorization, UserController.update);
//delete
router.delete('/user/:id', AdminAuth.adminAuthorization,  UserController.delete);



//Export
module.exports = router;
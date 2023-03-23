//Imports
const UserService = require('../services/UserService');
const PasswordTokenService = require('../services/PasswordTokenService');
const jwt = require('jsonwebtoken');
const secret = require('../security/secret');
const bcrypt = require('bcrypt');

class UserController {

    //CRUD USER starts here
    async findAll(req,res) {
        let users = await UserService.findAll();
        if(users.status) {
            res.status(200);
            res.json(users.result);
        }
        else {
            res.status(400);
            res.json({err: users.err});
        }
    }

    async findById(req,res) {
        let id = req.params.id;
        if(id == undefined || isNaN(id)) {
            res.status(406);
            res.json({err: 'This request expects a numeric type path parameter'});
        }
        else {
            let user = await UserService.findById(id);
            if(user.status && user.result.length > 0 ) {
                res.status(200);
                res.json(user.result[0]);
            }
            else {
                res.status(404);
                res.json({err: `There are no records for this ID! Id: ${id}`});
            }
        }
    }

    async create(req,res) {
        let {name,email,password} = req.body;
        console.log(name, email, password);
        //Improving data for validation
        if(name != undefined && email != undefined && password != undefined) {
            name = name.trim();
            email = email.trim();
            password = password.trim(); 
        }
        
        if(name == undefined || name.length == 0 || email == undefined  || email.length == 0 || password == undefined || password.length <= 3) {
            res.status(400);
            res.json({err:'Null or incorrectly filled fields are invalid'}); 
            return; 
        }

       let result = await UserService.create(name,email,password);
       if(result.status) {
            res.status(200);
            res.json({mgs:`Created new user Id: ${result.result}`});
            return;
       }
       else {
            res.status(406);
            res.json({err: result.err});
            return;
       }
    }

    async update(req,res) {
        let id = req.params.id;
        let {name,email,role} = req.body;
        if(id != undefined && name != undefined && email != undefined && role != undefined) {
            let result = await UserService.update(id,name,email,role);
            if(result.status) {
                res.status(200);
                res.json(result.user.result[0]);
                return;
            }
            else {
                res.status(400);
                res.json({err: result.err});
                return;
            }
        }
        else {
            res.status(406);
            res.json({err:'Null or incorrectly filled fields are invalid'}); 
            return;
        }
    }

    async delete(req,res){
        let id = req.params.id;
        if(id != undefined && !isNaN(id)) {
            let result = await UserService.delete(id);
            if(result.status) {
                res.status(204);
                res.json({msg: 'successfully deleted'});
                return;
            }
            else {
                res.status(400);
                res.json({err: result.err});
                return;
            }
        }
        else {
            res.status(406);
            res.json({err:'Id invalid or passed incorrectly!'});
            return;
        }
    }//CRUD USER end here


    //Password recovery method
    async recoverPassword(req,res) {
        let email = req.body.email;
        if(email != undefined) {
            let result  = await PasswordTokenService.create(email);
            if(result.status) {
                res.status(200);
                res.json({token: result.token});
                return;
            }
            else {
                res.status(400);
                res.json({err: result.err});
                return;
            }
        }
        else {
            res.status(406);
            res.json({err: 'Please, enter a valid email address!'});
            return;
        }
    }

    //Password change method
    async changePassword (req,res) {
        let {token,password} = req.body;
        let result;
        //Validating data sent in the request
        if(token !== undefined && password !== undefined) {
            //Validating minimum password length
            if(password.length >= 3) {
                //Validating token
              result = await PasswordTokenService.validate(token);
            }
            else {
                res.status(406);
                res.json({err: 'The minimum password length is three characters.'});
                return;
            }
            //Checking token validation result
            if(result.status) {
               let value = await UserService.changePassword(password, result.id, result.token);
               console.log('changePassword (UserController)', value);
               res.status(200);
               res.json({msg:'Password changed'});
               return;
            }
            else {
                res.status(400);
                res.json({err: result.err})
                return;
            }
        }
        else {
            res.status(406);
            res.json({err: 'Error token or password invalid!'});
            return;
        }
    } 

    //User login
    async login(req, res){
        let {email, password} = req.body;
        if(email != undefined && password != undefined) {
            let user = await UserService.findByEmail(email);
            if(user != undefined && user.result.length > 0) {
               let result = await bcrypt.compare(password,user.result[0].password);
                if(result) {
                    var token = jwt.sign({ email: user.result[0].email, role: user.result[0].role }, secret);
                    res.status(200);
                    res.json({token: token});
                    return;
                }
                else {
                    res.status(403);
                    res.json({err: 'Invalid password', status:result});
                    return;
                }
            }
            else {
                res.status(404);
                res.json({err: 'There are no users for this email'});
                return;
            }

        }
        else {
            res.status(406);
            res.json({err: 'Email and password are required!'});
            return;
        }
    }
} 

//Exports
module.exports = new UserController();
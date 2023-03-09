//Imports
const UserService = require('../services/UserService');
const PasswordTokenService = require('../services/PasswordTokenService');

class UserController {

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
        
        //Improving data for validation
        if(name != undefined && email != undefined && password != undefined) {
            name = name.trim();
            email = email.trim();
            password = password.trim(); 
        }
        
        if(name == undefined || name.length == 0 || email == undefined  || email.length == 0 || password == undefined || password.length > 3) {
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
            }
            else {
                res.status(400);
                res.json({err: result.err});
            }
        }
        else {
            res.status(406);
            res.json({err:'Null or incorrectly filled fields are invalid'}); 
        }
    }

    async delete(req,res){
        let id = req.params.id;
        if(id != undefined && !isNaN(id)) {
            let result = await UserService.delete(id);
            if(result.status) {
                res.status(204);
                res.json({msg: 'successfully deleted'});
            }
            else {
                res.status(400);
                res.json({err: result.err});
            }
        }
        else {
            res.status(406);
            res.json({err:'Id invalid or passed incorrectly!'});
        }
    }

    //Password recovery method
    async recoverPassword(req,res) {
        let email = req.body.email;
        if(email != undefined) {
            let result  = await PasswordTokenService.create(email);
            if(result.status) {
                res.status(200);
                res.json({token: result.token});
            }
            else {
                res.status(400);
                res.json({err: result.err});
            }
        }
        else {
            res.status(406);
            res.json({err: 'Please, enter a valid email address!'});
        }
    }
}

//Exports
module.exports = new UserController();
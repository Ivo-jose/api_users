//Imports
let UserService = require('../services/UserService');

class UserController {

    async index(req,res) {}


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
            res.send('Getting the request body');
            return;
       }
       else {
            res.status(406);
            res.json({err: result.err});
            return;
       }
    }
}

//Exports
module.exports = new UserController();
//Imports
let UserService = require('../services/UserService');

class UserController {

    async index(req,res) {}

    async create(req,res) {
        console.log(req.body);
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
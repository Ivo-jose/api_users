class UserController {

    async index(req,res) {}

    async create(req,res) {
        console.log(req.body);
        let {name,email,password,role} = req.body;
        
        //Improving data for validation
        if(name != undefined && email != undefined && password != undefined) {
            name = name.trim();
            email = email.trim();
            password = password.trim(); 
        }
        
        if(name == undefined || name.length == 0 || email == undefined  || email.length == 0 || password == undefined || password.length > 3 || role == undefined) {
            res.status(400);
            res.json({err:'Null or incorrectly filled fields are invalid'}); 
            return; 
        }
        res.status(200);
        res.send('Getting the request body');
    }
}

//Exports
module.exports = new UserController();
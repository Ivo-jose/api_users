class UserController {

    async index(req,res) {}

    async create(req,res) {
        console.log(req.body);
        res.send('Getting the request body');
    }
}

//Exports
module.exports = new UserController();
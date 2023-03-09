class HomeController {

    async index(req,res) {
        res.send("APP EXPRESS! - Guia do programador")
    }
}

//Export
module.exports = new HomeController();
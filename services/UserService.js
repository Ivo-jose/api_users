//Import
let knexConnection = require('../database/connection');
let bcrypt = require('bcrypt');

class UserService {

    async create(name,email,password) {
        try {
            //Checking that the email provided does not exist, so that it can be registered
            let hasEmail = await this.findEmail(email);
            console.log('service: create findEmail', hasEmail.result.length);
            if(hasEmail.result.length == 0) {
                let hash = await bcrypt.hash(password,10);
                let result = await knexConnection.insert({name: name, email: email, password: hash, role: 0}).table('users');
                console.log('service: create ', result);
                return {status:true, result}
            }
            else {
                return {status:false, err: 'This email is already registered in the system'};
            }
           
        } catch (error) {
            console.log(error.message);
            return {status:false, err: error.message};
        }
    }


    //Method to check if the email already exists in the db
    async findEmail(email) {
        try {
            let result = await knexConnection.select('*').where({email:email}).from('users');
            console.log('service: findEmail ', result);
            return {status:true, result};
        }
        catch(error) {
            console.log('servvice findEmail error ', error.message);
            return {status:false, err:error.message};
        }
    }
}

//Export
module.exports = new UserService();
//Importing libs
const knexConnection = require('../database/connection');
let UserService = require('./UserService');

class PasswordToken {

    //Method for creating token
    async create(email) {
        let token = Date.now();
        try {
            var user = await this.findByEmail(email);
            if(user != undefined) {
                await knexConnection.insert({user_id: user.result[0].id, used:0, token: token}).table('password_tokens');
                return {status: true, token: token};
            }
            else {
                return {status:false, err:'The email provided does not exist'};
            }
             
        }    
        catch(error) {
            return {status:false, err: error.message}
        }    
    }

    //Method for validating the token
    async validate(token) {
        try{
            let result = await knexConnection.select("*").where({token: token}).table('password_tokens');
            if(result.length > 0) {
                let tk = result[0];
                if(!tk.used) {
                    return {status: true, token: tk.token, id: tk.user_id};
                }
                else {
                    return {status:false, err: `This token has already been used, so it's invalid`};
                }
            }
            else {
                 return {status:false, err: 'The given token does not exist!'}   
            }
        }
        catch(error) {
            return {status:false, err: error};
        }
    }

    //Changing token status from unused to used
    async setUsed (token) {
        await  knexConnection('password_tokens').where({token: token}).update({used: 1});
    }

    //Method to check if the email already exists in the db
    async findByEmail(email) {
        try {
            let result = await knexConnection.select('*').where({email:email}).from('users');
            console.log('passs: findEmail ', result);
            return {status:true, result};
        }
        catch(error) {
            console.log('pass findEmail error ', error.message);
            return {status:false, err:error.message};
        }
    }
}

//Exporting
module.exports = new PasswordToken();
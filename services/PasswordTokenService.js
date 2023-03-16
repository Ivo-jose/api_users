//Importing libs
const knexConnection = require('../database/connection');
const UserService = require('./UserService');

class PasswordToken {

    //Method for creating token
    async create(email) {
        let user = await UserService.findByEmail(email);
        if(user.result.length > 0) {
            let token =  Date.now();
            try {
                await knexConnection.insert({user_id: user.result[0].id, token: token, used: 0}).table('password_tokens');
                return {status:true,token};
            } catch (error) {
                return {status:false, err: error.message};
            }
        } 
        else {
            return {status:false, err: 'There are no records users with this e-mail! '};
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
}

//Exporting
module.exports = new PasswordToken();
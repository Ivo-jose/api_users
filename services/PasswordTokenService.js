//Importing libs
const knexConnection = require('../database/connection');
const UserService = require('./UserService');

class PasswordToken {

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
}

//Exporting
module.exports = new PasswordToken();
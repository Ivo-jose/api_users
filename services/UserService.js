//Import
let knexConnection = require('../database/connection');
let bcrypt = require('bcrypt');

class UserService {

    async findAll() {
        try {
            let result = await knexConnection.select('id','name','email','role').table('users');
            return {status: true, result};
        } catch (error) {
            return {status: false, err: error.message};
        }
    }


    async findById(id) {
        try {
            let result = await knexConnection.select('id','name','email','role').table('users').where({id:id});
            return {status:true, result}
        } catch (error) {
            console.log('Service: (findById)', error.message);
            return {status: false, err: error.message};
        }
    }

    async create(name,email,password) {
        try {
            //Checking that the email provided does not exist, so that it can be registered
            let hasEmail = await this.findEmail(email);
            if(hasEmail.result.length == 0) {
                let hash = await bcrypt.hash(password,10);
                let result = await knexConnection.insert({name: name, email: email, password: hash, role: 0}).table('users');
                return {status:true, result}
            }
            else {
                return {status:false, err: 'This email is already registered in the system'};
            }
           
        } catch (error) {
            return {status:false, err: error.message};
        }
    }

    async update(id,name,email,role) {
        let user = await this.findById(id);
        console.log('Service (update): ',user)
        if(user.status && user.result.length > 0) { 
            let result = await this.findEmail(email);
            console.log('Service (update)', result);
            if((result.status && result.result.length == 0) || (result.status && result.result[0].email == user.result[0].email)) {
                try {
                   await knexConnection.update({name:name,email:email,role:role}).where({id:id}).table('users');
                   user = await this.findById(id);
                   return {status:true, user};
                }   
                catch(error) {
                    return {status:false, err: error.message}
                }
            }
            else {
                return {status: false, err:'This email is already registered in the system'};
            }
        }
        else {
            return {status:false, err: `There are no records for this ID! Id: ${id}`};
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
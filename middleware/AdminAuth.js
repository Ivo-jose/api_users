//Imports
let jwt = require('jsonwebtoken');
const secret = require('../security/secret');


class AdminAuth {
     adminAuthorization(req,res,next) {
        const authToken = req.headers['authorization'];
        if(authToken != undefined) {
            const bearer = authToken.split(' ');
            let token = bearer[1];
            try {
                let decode = jwt.verify(token,secret);
                console.log('Middleware decode', decode);
               if(decode.role == 1) {
                    console.log('Middleware decode', decode);
                    next();
               }
               else {
                res.status(403);
                res.json({err: 'You do not have permission to access this page.!'});
                return;
               }
            } catch (error) {
                res.status(403);
                res.json({err: error});
                return;
            }
        }
        else {
            res.status(403);
            res.json({err: 'You are not authenticated!'});
            return;
        }
    }

    userAuthorization(req,res,next) {
        const authToken = req.headers['authorization'];
        if(authToken != undefined) {
            const bearer = authToken.split(' ');
            let token = bearer[1];
            try {
                let decode = jwt.verify(token,secret);
               if(decode.role == 0 || decode.role == 1) {
                    console.log('Middleware decode', decode);
                    next();
               }
               else {
                res.status(403);
                res.json({err: 'You do not have permission to access this page.!'});
                return;
               }
            } catch (error) {
                res.status(403);
                res.json({err: error});
                return;
            }
        }
        else {
            res.status(403);
            res.json({err: 'You are not authenticated!'});
            return;
        }
    }
}

//Export
module.exports = new  AdminAuth();
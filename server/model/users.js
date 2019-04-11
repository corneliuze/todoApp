const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const bcrypt = require('bcryptjs');



var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minLength: 3,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },

    password: {
        type: String,
        minLength: 5,
        required: true
    },
   token: {
            type: String,
            minLength: 3}
        
    
    
}
);

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};


// UserSchema.statics.findByToken = function(token){
//     var User = this;
//     var decoded;
//      try{
//         decoded = jwt.verify(token, 'abc123');
//         console.log( 'what is decoded' ,decoded)
       
        
//          }catch(e){
//            console.log('error while trying verifying', e)
//        }
//     return User.findOne({
//         '_id' : decoded._id,
//          'token' : token
         
//     });
    
 
// }


function generateToken(_id) {
   
    console.log('the id we are using is', _id);
    const token = jwt.sign({_id: _id.toHexString()}, 'abc123').toString();
    
        return token;
    // })

}

async function findByToken(token){
    let decoded;
    console.log('xfsdhrf');
    try{
        decoded =  jwt.verify(token, 'abc123');
        console.log('verification successful', decoded);
    }catch(e){
        return Promise.reject();
    }
    console.log('the token is', token)
    var response = await UserModel.findOne({
        '_id' : decoded._id,
        'token' : token
    });
    console.log('the response is', response);
    return response;
    
    
      
}

const UserModel = mongoose.model('User', UserSchema)

module.exports ={UserModel,generateToken, findByToken};
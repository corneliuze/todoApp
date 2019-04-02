const mongoose  = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    email :{
        type : String,
        minLength : 3,
        unique:true,
        required : true,
        trim : true,
        validate:{
            validator : (value) =>{
                validator.isEmail(value)
            },
            message: '{value} is not a valid email'

        }
    },
    password :{
        type : String,
        minLength : 5,
        require:true
    },
    tokens:{
        access:{
            type : String,
            minLength : 3

        },
        token:{
            type : String,
            minLength: 3
        }
    }
})

module.exports = {User}
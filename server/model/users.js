const mongoose  = require('mongoose');

const User = mongoose.model('User', {
    email :{
        type : String,
        minLength : 3,
        required : true,
        trim : true
    }
})

module.exports = {User}
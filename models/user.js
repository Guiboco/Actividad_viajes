const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const SALT = 10;
const jwt = require('jsonwebtoken');
const SECRET_AUTH_JWT = require('../config/password').SECRET_AUTH_JWT;

const userSchema = new mongoose.Schema({
    email:{
        require: true,
        type:String,
        unique: true,
        validate: function(email){
            return new Promise (function(resolve){
                resolve(isEmail(email))
            })
        }
    },
    password:{
        type: String,
        minlength: 6,
        maxlength: 10,
        require: true,
    },
    userName:{
        type: String,
        unique: true,
        trim: true, // esto lo que hace es eliminar los espacios en blanco
        maxlength: 12
    },
    confirmedEmail :Boolean
},{
    // timestamps: true,
});

userSchema.methods.toJSON = function () { //override of the toJSON method to add token and remove password fields
    const { _id, name, lastname, username, email, token } = this; //here we take the user properties
    return { _id, name, lastname, username, email, token }; //here we return the user properties
};

userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(SALT).then(salt => bcrypt.hash(user.password, salt).then(hash => {
            user.password = hash;
            return next();
        }).catch(err => next(err))).catch(err => next(err))
    } else next();
});

userSchema.methods.generateAuthToken = function () {
    const user = this; // calls the this which contains the user properties
    const token = jwt.sign({
        _id: user._id
    }, SECRET_AUTH_JWT, {
        expiresIn: "7d"
    })
    return token;
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
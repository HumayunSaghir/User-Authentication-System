const {Schema, model} = require('mongoose')
const {createHash, randomBytes, createHmac} = require('crypto')
const { create } = require('domain')
const {createToken} = require('../services/auth')

// user schema
const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    salt : {
        type : String,
    },

}, {timestamps : true})

// hook for hashing the user password before saving document it will run automatically
userSchema.pre('save', function(){
    // here this will represent the current doc / user.
    const user = this

    if(user.isModified('password')){

        // generating a random salt
        const salt = randomBytes(16).toString('hex');

        // now hashing and setting the hashed password
        const hashedPassword = createHmac('sha256', salt)
            .update(user.password)
            .digest('hex')

        user.password = hashedPassword
        user.salt = salt
    }
})

// hook for matching password and returning token if password is correct at login
userSchema.static('matchPassword', async function(email, password){
    // here this will refer to current collection
    const user = await this.findOne({email : email})

    // when user not found
    if(!user){
        throw new Error('Invalid Email!')
    }

    // when user found
    const salt = user.salt
    const hashedPass = user.password

    const newHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex')

    // when password not matched
    if(hashedPass !== newHash){
        throw new Error('Incorrect Password')
    }

    // when password is matched we have to deal with tokens
    const token = createToken(user)
    return token

})

// user model
const userModel = new model('users', userSchema)

module.exports = userModel
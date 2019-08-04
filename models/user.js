const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true, 
        required: true
    },
    password: String, // might be unnecessary when we do Google integration,
    authType: String, // values can be local or google
    googleAuth: {
        // we should do our google auth_id section here
        google_id: String,
        refresh_token: String,
        access_token: String,
        id_token: String
    }
})

UserSchema.methods.checkPassword = function(password){
    return bcrypt.compare(password, this.password)
}

UserSchema.pre('save', function(next){
    return bcrypt.genSalt(10).then(salt => {
        return bcrypt.hash(this.password, salt)
    }).then(hash => {
        this.password = hash
        return Promise.resolve()
    })
});

// After we save to a user make sure to relog them in

const User = mongoose.model("User", UserSchema)

module.exports = User;
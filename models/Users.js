const mongoose = require('mongoose');
const crypto = require('crypto');
const {Schema} = mongoose;


const UserSchema =  new Schema({
    username: String,
    email: String,
    hash: String,
    salt : String
});

UserSchema.methods.encryptPass = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
};

UserSchema.methods.checkPass = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
    return hash === this.hash;
}
module.exports = mongoose.model('Users', UserSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide a username']
    },
    password: {
        type: String,
        required:[true, 'Please provide a password']
    }
});
userSchema.plugin(uniqueValidator)
userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
})
const User = mongoose.model('User', userSchema);
module.exports = User;
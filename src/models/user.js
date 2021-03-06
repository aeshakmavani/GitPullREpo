const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    contactNumber: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    }
}, {timestamps: true });

userSchema.virtual('password')
    .set(function(password){
         this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.method = {
    authenticate:  function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.models('User'); 
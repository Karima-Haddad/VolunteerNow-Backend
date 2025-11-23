const mongoose = require('mongoose');

const User = new mongoose.model('user',{


    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['benevole', 'organisation'],
        required: true
    },

    name: {
        type: String,
        required: true
    },    

    ville: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    photo: {
        type: String,      
        default: ""
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    bio: {
        type: String,      
        default: ""
    }

});

module.exports = User;

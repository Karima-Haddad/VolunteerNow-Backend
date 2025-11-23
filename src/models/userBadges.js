const mongoose = require('mongoose');

const UserBadge =  mongoose.model({

    user_id: {
        type: Number,          // FK vers User.id
        required: true
    },

    badge_id: {
        type: Number,          // FK vers Badge.id
        required: true
    },

    date_obtention: {
        type: Date,
        default: Date.now
    }

});

module.exports = UserBadge;

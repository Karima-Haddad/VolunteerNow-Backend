const mongoose = require('mongoose');

const UserBadge =  mongoose.model('userbadge',{

    user_id: {
        type: mongoose.Schema.Types.ObjectId,          // FK vers User.id
        required: true
    },

    badge_id: {
        type: mongoose.Schema.Types.ObjectId,          // FK vers Badge.id
        required: true
    },

    date_obtention: {
        type: Date,
        default: Date.now
    }

});

module.exports = UserBadge;

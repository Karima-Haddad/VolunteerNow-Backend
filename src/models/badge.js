const mongoose = require('mongoose');

const Badge =  mongoose.model('badge',{

    nom: {
        type: String,
        required: true
    },

    icon: {
        type: String
    },

});

module.exports = Badge;

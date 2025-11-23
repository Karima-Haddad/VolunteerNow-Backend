const mongoose = require('mongoose');

const Badge =  mongoose.model({

    nom: {
        type: String,
        required: true
    },

    icon: {
        type: String
    },

});

module.exports = Badge;

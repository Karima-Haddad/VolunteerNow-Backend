const mongoose = require('mongoose');

const Organisation =  mongoose.model({

    id_user: {
        type: Number,
        required: true,
        unique: true   
    },

    site_web: {
        type: String,
        default: ""
    },

    categories: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    }

});

module.exports =  Organisation;

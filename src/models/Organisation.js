const mongoose = require('mongoose');

const Organisation =  mongoose.model('organisation',{

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

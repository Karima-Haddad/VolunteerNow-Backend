const mongoose = require('mongoose');

const Evenement =  mongoose.model('evenement',{

    organisation_id: {
        type: mongoose.Schema.Types.ObjectId,          // FK → user.id
        required: true
    },

    titre: {
        type: String,
        required: true
    },

    description: {
        type: String,           
        default: ""
    },

    date_event: {
        type: Date,
        required: true
    },

    localisation: {
        type: String,
        required: true
    },

    categorie: {
        type: String,
        required: true
    },

    nb_places: {
        type: Number,
        required: true,
        min: 0
    },

    statut: {
        type: String,
        enum: ['ouvert', 'ferme', 'termine'],
        default: 'ouvert'
    }

});

module.exports =  Evenement;

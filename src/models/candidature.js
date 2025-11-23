const mongoose = require('mongoose');

const Candidature=  mongoose.model('candidature',{

    user_id: {
        type: mongoose.Schema.Types.ObjectId,         // FK → User.id
        required: true
    },

    event_id: {
        type: mongoose.Schema.Types.ObjectId,         // FK → Evenement.id
        required: true
    },

    statut: {
        type: String,
        enum: ['en_attente', 'acceptee', 'refusee'],
        default: 'en_attente'
    },

    date_candidature: {
        type: Date,
        default: Date.now
    }

});

module.exports = Candidature;

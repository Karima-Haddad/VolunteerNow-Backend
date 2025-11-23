const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/VolunteerNowDB')
    .then(() => {
        console.log("MongoDB connecté ✔");
    })
    .catch(err => {
        console.log("Erreur MongoDB ❌", err);
    });


module.exports = mongoose;
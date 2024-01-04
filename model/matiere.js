let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = new Schema({
    id: Number,
    nom: String,
    professeur: String,
    image: String
});

module.exports = mongoose.model('Matiere', MatiereSchema);
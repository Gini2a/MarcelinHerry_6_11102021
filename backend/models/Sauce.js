//importer mongoose
const mongoose = require('mongoose');

//Creation schema de données. Un modèle de donnée qui permet d'enregistrer, lire et modifier les objets qui sont en vente dans la base de données
const sauceSchema = mongoose.Schema({
    userId : {type: String, require: true},
    name : {type: String, require: true},
    manufacturer : {type: String, require: true},
    description : {type: String, require: true},
    imageUrl : {type: String, require: true},
    mainPepper : {type: String, require: true},
    heat : {type: Number, require: true},
    likes:{type:Number, require: true, default:0},
    dislikes:{type:Number, require: true, default:0},
    usersLiked :{type: [String]},
    usersDisliked :{type: [String]}
})

//Exportation du schema en tant que modèle Mongoose apppelée Sauce, et rendu disponible pour express
module.exports = mongoose.model('Sauce', sauceSchema);
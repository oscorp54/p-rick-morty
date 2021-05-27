var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    codeChar: String,
    isFavorite: String
});

var character = mongoose.model('character', characterSchema);
 
module.exports = character;
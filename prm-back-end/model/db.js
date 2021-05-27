var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://rickmorty:developer123@cluster0.nxnyk.mongodb.net/develop_rickmorty?retryWrites=true&w=majority";

async function findCharFavorites(characters) {

    let client = await MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
    let db = client.db('develop_rickmorty');
    let favoritesSave = await db.collection("character").find({isFavorite: '1'}).toArray();
    client.close();
    
    favoritesSave = favoritesSave.map(function(item) { return parseInt(item.codeChar) });
    
    characters = characters.map(function(char) {
        char.isFavorite = (favoritesSave.includes(char.id) ? 1 : 0);
        return char;
    });
    console.log('new',characters);
    return await characters;
}

module.exports = { findCharFavorites };
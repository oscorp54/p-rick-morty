const characterCtrl = {};

const Character = require('../model/character');

characterCtrl.getFavorites = async () => {
    const favorites = await Character.find({isFavorite:'1'});
    return favorites;
};

characterCtrl.setFavorite = async (favorite) => {
    const character = await Character.find({codeChar:favorite.id});
    if (character === {}) {
        character = new Character({codeChar: favorite.id, isFavorite: favorite.isFavorite});
        await character.save();
    } else {
        if (favorite.isFavorite != character.isFavorite) {
            await Character.findByIdAndUpdate(character.id, character);
        }
    }
};

module.exports = characterCtrl;
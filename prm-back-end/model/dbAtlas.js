import mongoose from 'mongoose';
import Character from './character';

var uri = "mongodb+srv://rickmorty:developer123@cluster0.nxnyk.mongodb.net/develop_rickmorty?retryWrites=true&w=majority";

const connectDB = () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

const models = { Character };

export { connectDB };

export default models;
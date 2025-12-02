import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
dotenv.config({ path: path.resolve('../.env') });
console.log("MONGO_DB =", process.env.MONGO_DB);




// Connect to database
mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`database connection error: ${err}`);
});
db.on('disconnected', () => {
    console.log('database disconnected');
});
db.once('open', () => {
    console.log(`database connected to ${db.name} on ${db.host}`);
});
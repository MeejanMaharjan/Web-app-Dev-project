
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './.env' });

const dbConfig = {
  url: process.env.MongoDB_URI,
};

export default dbConfig;

const DBConnection = async () => {

    try {
        await mongoose.connect(dbConfig.url, {
        });

        console.log('DB connection be good')

    } catch (error) {
        console.error('Database connection be bad:', error);
        process.exit(1);
    }
}

export { DBConnection };
import dotenv from 'dotenv';

dotenv.config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const dbConnectionString = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.lxo0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


export default { dbConnectionString };

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route  from './routes/userRoute.js'
import cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL

//Now we want to connect to the mongoDB database

app.use('/api', route)


mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Connected to port: ${PORT}`)
        });
    }).catch((error) => {
        console.log("Error: ", error)
    })
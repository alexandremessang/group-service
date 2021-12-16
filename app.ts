import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { router } from './app.router';
import { ConnectionOptions } from 'tls';
export const app = express();

dotenv.config();

try {
    mongoose.connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true } as ConnectionOptions,
        () => console.log('Connected'),
        );
} catch (err) {
    console.log("Error while connecting : " + err.data);
   
}

app.use(cors());
app.use(express.json());
app.use(router);


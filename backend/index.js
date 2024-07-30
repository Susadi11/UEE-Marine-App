import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import BlogRoute from "./routes/BlogRoute.js";

const app = express();

app.use(express.json());

// Uncomment the following line if you need to use CORS
// app.use(cors());

app.use(cors({
    origin: ['http://localhost:3000', ''],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome to Elemahana');
});

app.use('/blog', BlogRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

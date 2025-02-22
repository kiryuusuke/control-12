import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import mongoDb from "./mongoDb";
import {userRouter} from "./router/userRouter";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/users', userRouter);

const run = async() => {
    await mongoose.connect('mongodb://localhost/');

    app.listen(port, () => {
        console.log(`Server running on port: http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    })
};

run().catch(err => console.error(err));
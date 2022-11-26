import express from "express";
import router from "./routes/route.js";
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
import Connection from './database/db.js'

const app = express();
const PORT = process.env.PORT || 8000;


dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api', router);

app.listen(PORT, () => {
    console.log("listening on http://localhost:8000")
})
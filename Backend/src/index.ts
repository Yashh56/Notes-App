import express from 'express';
import dotenv from 'dotenv';
import {connectToDB} from './db/connectToDB.js';
import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();


// Middlewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))

// DB
connectToDB();

// Routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);





app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  return console.log(`Express is listening at http://localhost:${3000}}`);
});
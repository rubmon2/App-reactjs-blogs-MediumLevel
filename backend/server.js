import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDB } from './src/db/db.js';
import routesBlogs from './index.js';

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use('/', routesBlogs);

app.listen(PORT, async () => {
  console.log('app corriendo en puerto :', PORT);
});

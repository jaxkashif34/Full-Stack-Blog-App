/* The above code is a server.js file that is used to create a server. */
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));
// import postRoutes from './src/routes/posts';
import authRoutes from './src/routes/auth';
import tokenRoutes from './src/routes/token/token';

// ******************** POSTS ********************
// app.use('/posts', postRoutes);
// ******************** USER ********************
app.use('/user', authRoutes);
app.use('/tkn', tokenRoutes);

const PORT = process.env.SERVER_PORT || 8000;
app.listen(PORT, () => console.log(`⚡️ Server is up on http://localhost:${PORT}`));

import express from 'express';
import cors from 'cors';
// import songsRouter from './routes/songs-route';
// import albumsRouter from './routes/albums-route';
import { songsRouter, albumsRouter } from './routes';

const app = express();
app.use(express.json());
if (process.env.NODE_ENV !== 'production') { app.use(cors()); }

app.use('/api/songs', songsRouter);
app.use('/api/albums', albumsRouter);

app.listen(process.env.PORT, () => {});

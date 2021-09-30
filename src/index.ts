import express from 'express';
import cors from 'cors';
import { songsRouter, albumsRouter } from './routes';

const app = express();
app.use(express.json());
if (process.env.NODE_ENV !== 'production') { app.use(cors()); }

app.use('/api/songs', songsRouter);
app.use('/api/albums', albumsRouter);

// 404 catchall
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Invalid route' });
});

app.listen(process.env.PORT, () => {});

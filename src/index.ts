import express from 'express';
import cors from 'cors';
import { songsRouter, albumsRouter } from './routes';

require('express-async-errors');

const app = express();
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use('/api/songs', songsRouter);
app.use('/api/albums', albumsRouter);

// 404 catchall
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Invalid route' });
});

app.get('/sync-test', async (req:any, res:any) => {
  throw new Error('Error from synchronous code!');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:Error, req:express.Request, res:express.Response, next:Function) => {
  console.log('Unhandled exception');
  //   console.log('Path: ', req.path);
  //   console.error('Error: ', error);

  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).send(error);
  }
  return res.status(500).json({ error: 'Internal server error' });

  next(error);
});

app.listen(process.env.PORT, () => {});

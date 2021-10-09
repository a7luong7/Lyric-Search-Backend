import express from 'express';
import cors from 'cors';
import { songsRouter, albumsRouter, youtubeRouter } from './routes';

const path = require('path');
require('express-async-errors');

const app = express();

// app.use(express.static('build'));
app.use(express.static(path.join('build')));

app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use('/api/', songsRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/videos', youtubeRouter);

// 404 catchall
// app.get('*', (req, res) => {
//   res.status(404).json({ error: `Invalid routess${req.path}` });
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:Error, req:express.Request, res:express.Response, next:Function) => {
  console.log(`Unhandled exception at: ${req.path}`);
  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).send(error);
  }
  return res.status(500).json({ error: 'Internal server error' });
  next(error);
});

app.listen(process.env.PORT, () => {});

import express from 'express';
import cors from 'cors';
import songsRouter from './routes/songs-route';

const app = express();
app.use(express.json());

// const corsOptions: cors.CorsOptions = {
//     origin: ['http//:localhost:3000','https//:localhost:3000']
// };
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_, res) => {
  res.send('pong');
});

app.use('/api/songs', songsRouter);

app.listen(PORT, () => {
  // console.log(`Now listening on port ${PORT}`);
});

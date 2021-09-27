import express from 'express';
import { searchSongs } from '../service/songs-service';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { lyrics } = req.query;
  if (!lyrics) { return res.status(400).json({ error: 'Please provide lyrics' }); }
  // try {
  //     const newPatientRequest = toNewPatientRequest(req.body);
  //     const newPatient = PatientsService.addPatient(newPatientRequest);
  //     res.status(200).json(newPatient);
  // } catch (error : any) {
  //     console.log('request', req.body);
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     res.status(400).json({ error: error.message });
  // }

  const songs = await searchSongs(lyrics as string);
  return res.status(200).json(songs);
});

router.get('/:id', (req, res) => {
  res.status(200).json({ error: 'Song get Not yet implemented' });
});

export default router;

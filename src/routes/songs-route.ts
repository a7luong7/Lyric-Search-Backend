import express from 'express';
import { searchSongs } from '../service/songs-service';
import { getAlbumFromSong } from '../service/albums-service';
import { Song, SongLookupRes } from '../types';

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
  try {
    const songSearchRes = await searchSongs(lyrics as string);
    console.log('song search res', songSearchRes);
    const songs = <Song[]>[];
    if (songSearchRes.track_list && songSearchRes.track_list.length !== 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < songSearchRes.track_list.length; i++) {
        const song = songSearchRes.track_list[i];
        // eslint-disable-next-line no-await-in-loop
        const album = await getAlbumFromSong(song);
        if (album) {
          song.track.album_coverart = album.album_coverart || '';
          songs.push(song);
        }
      }
    }

    return res.status(200).json(songs);
  } catch (e) {
    console.log('search song error', e);
    return res.status(500).json({ error: 'Could not get songs' });
  }
});

router.get('/:id', (req, res) => {
  res.status(200).json({ error: 'Song get Not yet implemented' });
});

export default router;

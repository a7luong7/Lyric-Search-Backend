import express from 'express';
import { searchSongs, filterSongs } from '../service/songs-service';
import { getAlbumFromSong } from '../service/albums-service';
import { Song } from '../types';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { lyrics } = req.query;
  if (!lyrics) { return res.status(400).json({ error: 'Please provide lyrics' }); }

  try {
    const songSearchRes = await searchSongs(lyrics as string);
    // return res.status(200).json(songSearchRes.track_list);
    const filteredSongs = filterSongs(songSearchRes);
    const songs = <Song[]>[];
    const promises = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filteredSongs.length; i++) {
      const song = filteredSongs[i];

      // const promise = new Promise((resolve, reject) => {
      //   getAlbumFromSong(song).then((album) => {
      //     if (album) {
      //       song.track.album_coverart = album.album_coverart || '';
      //       // songs.push(song);
      //     }
      //     songs.push(song);
      //     resolve(album);
      //   }).catch((e) => {
      //     songs.push(song);
      //     reject();
      //   });
      // });
      // promises.push(promise);

      // eslint-disable-next-line no-await-in-loop
      const album = await getAlbumFromSong(song);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 200));
      if (album) {
        song.album_coverart = album.album_coverart || '';
        songs.push(song);
      }
      // songs.push(song);
    }

    // await Promise.all(promises);
    const sortedSongs = songs.sort((a, b) => {
      if (a.track_rating < b.track_rating) return 1;
      if (a.track_rating > b.track_rating) return -1;
      return 0;
    });
    return res.status(200).json(sortedSongs);
  } catch (e) {
    console.log('search song error', e);
    return res.status(500).json({ error: 'Could not get songs' });
  }
});

router.get('/:id', (req, res) => {
  res.status(200).json({ error: 'Song get Not yet implemented' });
});

export default router;

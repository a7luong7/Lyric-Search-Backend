/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import express from 'express';
import { searchSongs, filterSongs } from '../service/songs-service';
import { getReleaseFromSong } from '../service/albums-service';
import { Song, Release } from '../types';
import { sortBy, wait } from '../utils';

const router = express.Router();

const getReleaseFromSongPromise = (songs:Song[], song:Song) : Promise<Release | null> => {
  const promise = new Promise<Release | null>((resolve, reject) => {
    getReleaseFromSong(song).then((album) => {
      if (album) {
        // eslint-disable-next-line no-param-reassign
        song.album_coverart = album.album_coverart;
        // songs.push(song);
      }
      songs.push(song);
      resolve(album);
    }).catch((e) => {
      songs.push(song);
      reject(e);
    });
  });
  return promise;
};

router.get('/search', async (req, res) => {
  const { lyrics } = req.query;
  if (!lyrics) { return res.status(400).json({ error: 'Please provide lyrics' }); }

  try {
    const songSearchRes = await searchSongs(lyrics as string);
    const filteredSongs = filterSongs(songSearchRes);
    const songs = <Song[]>[];

    // // Retrieve albums sequentially
    // for (let i = 0; i < filteredSongs.length; i++) {
    //   const song = filteredSongs[i];
    //   await getReleaseFromSongPromise(songs, song);
    //   await wait(200);
    // }

    // Retrieve albums simultaneously (multiple active calls may lead to rejection by musicbrain)
    const promises = [];
    for (let i = 0; i < filteredSongs.length; i++) {
      const song = filteredSongs[i];
      promises.push(getReleaseFromSongPromise(songs, song));
    }
    await Promise.all(promises);

    const sortedSongs = sortBy(songs, 'track_rating', 'desc');
    return res.status(200).json(sortedSongs);
  } catch (e) {
    console.log('search song error', e);
    return res.status(500).json({ error: 'Could not search songs' });
  }
});

router.get('/:id', (req, res) => {
  res.status(200).json({ error: 'Song get Not yet implemented' });
});

export default router;

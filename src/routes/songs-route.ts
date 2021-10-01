/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import express from 'express';
import { searchSongs, filterSongs, getSongLyrics } from '../service/songs-service';
import { getReleaseFromSong } from '../service/albums-service';
import { Song, Release } from '../types';
import {
  sortBy, wait, logError, returnResponseError, returnBadRequest, returnResponseSuccess,
} from '../utils';

require('express-async-errors');

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
  if (!lyrics) { return returnBadRequest(res, 'Please provide both the artist name and album title'); }

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
    return returnResponseSuccess(res, sortedSongs);
  } catch (e) {
    logError(e);
    return returnResponseError(res, 'Could not search songs');
  }
});

router.get('/:id/lyrics', async (req:express.Request, res:express.Response) => {
  const trackID = req.params.id;
  if (!trackID) { return returnBadRequest(res, 'Please a valid trackID'); }
  const trackIDNum = Number(trackID) as number;
  if (Number.isNaN(trackIDNum)) { return returnBadRequest(res, 'Please a valid trackID'); }

  const lyrics = await getSongLyrics(trackIDNum);
  if (lyrics) { return returnResponseSuccess(res, lyrics); }
  return returnResponseError(req, 'Could not get lyrics');
});

router.get('/:id', (req:express.Request, res:express.Response) => returnResponseError(res, 'Song get Not yet implemented'));

export default router;

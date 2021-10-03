/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import express from 'express';
import { searchSongs, searchSongsWithLyrics, getSongLyrics } from '../service/songs-service';
import { } from '../service/albums-service';
import { Song, Release } from '../types';
import {
  sortBy, wait, logError, returnResponseError, returnBadRequest, returnResponseSuccess,
} from '../utils';

require('express-async-errors');

const router = express.Router();

// const getReleaseFromSongPromise = (songs:Song[], song:Song) : Promise<Release | null> => {
//   const promise = new Promise<Release | null>((resolve, reject) => {
//     getReleaseFromSong(song).then((album) => {
//       if (album) {
//         // eslint-disable-next-line no-param-reassign
//         song.album_coverart = album.album_coverart;
//         // songs.push(song);
//       }
//       songs.push(song);
//       resolve(album);
//     }).catch((e) => {
//       songs.push(song);
//       reject(e);
//     });
//   });
//   return promise;
// };

router.get('/search', async (req, res) => {
  const { lyrics } = req.query;
  if (!lyrics) { return returnBadRequest(res, 'Please provide both the artist name and album title'); }
  const pageNum = Number(req.query.page);
  const page = Number.isNaN(pageNum) ? 1 : pageNum;

  try {
    const songSearchRes = await searchSongsWithLyrics(lyrics as string, page);
    return returnResponseSuccess(res, songSearchRes); // Premature return for resting

    // const filteredSongs = filterSongs(songSearchRes);
    const songs = <Song[]>[];

    // // Retrieve albums sequentially
    // for (let i = 0; i < filteredSongs.length; i++) {
    //   const song = filteredSongs[i];
    //   await getReleaseFromSongPromise(songs, song);
    //   await wait(200);
    // }

    // Retrieve albums simultaneously (multiple active calls may lead to rejection by musicbrain)
    // const promises = [];
    // for (let i = 0; i < filteredSongs.length; i++) {
    //   const song = filteredSongs[i];
    //   promises.push(getReleaseFromSongPromise(songs, song));
    // }
    // await Promise.all(promises);

    const sortedSongs = sortBy(songs, 'track_rating', 'desc');
    return returnResponseSuccess(res, sortedSongs);
  } catch (e) {
    logError(e);
    return returnResponseError(res, 'Could not search songs');
  }
});

router.get('/lyrics', async (req:express.Request, res:express.Response) => {
  const lyricsPath = req.query.path;
  if (!lyricsPath) { return returnBadRequest(res, 'Please provide path to lyrics'); }

  const lyrics = await getSongLyrics(lyricsPath as string);
  if (lyrics) {
    const lyricsJson = { lyrics };
    return returnResponseSuccess(res, lyricsJson);
  }

  return returnResponseError(req, 'Could not get lyrics');
});

router.get('/songs/:id', (req:express.Request, res:express.Response) => returnResponseError(res, 'Song get Not yet implemented'));

export default router;

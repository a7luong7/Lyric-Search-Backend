import express from 'express';
import { searchSongsWithLyrics, getSong, getSongLyrics } from '../service/songs-service';
import {
  logError, returnResponseError, returnBadRequest, returnResponseSuccess,
} from '../utils';

require('express-async-errors');

const router = express.Router();

router.get('/search', async (req, res) => {
  const { lyrics } = req.query;
  if (!lyrics) { return returnBadRequest(res, 'Please provide both the artist name and album title'); }
  const pageNum = Number(req.query.page);
  const page = Number.isNaN(pageNum) ? 1 : pageNum;

  try {
    const songSearchRes = await searchSongsWithLyrics(lyrics as string, page);
    return returnResponseSuccess(res, songSearchRes); // Premature return for resting
  } catch (e) {
    logError(e);
    return returnResponseError(res, 'Could not search songs');
  }
});

router.get('/lyrics', async (req: express.Request, res: express.Response) => {
  const lyricsPath = req.query.path;
  if (!lyricsPath) { return returnBadRequest(res, 'Please provide path to lyrics'); }

  const lyrics = await getSongLyrics(lyricsPath as string);
  if (lyrics) {
    const lyricsJson = { lyrics };
    return returnResponseSuccess(res, lyricsJson);
  }

  return returnResponseError(req, 'Could not get lyrics');
});

router.get('/songs/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  if (!id || Number.isNaN(Number(id))) {
    return returnBadRequest(res, 'Please provide a valid song ID');
  }
  const song = await getSong(Number(id));
  return returnResponseSuccess(res, song);
});

export default router;

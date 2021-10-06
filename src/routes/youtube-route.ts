/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { searchVideos } from '../service/youtube-service';
import { } from '../service/albums-service';
import {
  logError, returnResponseError, returnBadRequest, returnResponseSuccess,
} from '../utils';

require('express-async-errors');

const router = express.Router();

router.get('/', async (req, res) => {
  const { queryString } = req.query;
  if (!queryString) { return returnBadRequest(res, 'Please provide a query string for the video'); }

  try {
    const searchVideosRes = await searchVideos(queryString as string);
    return returnResponseSuccess(res, searchVideosRes); // Premature return for resting
  } catch (e) {
    logError(e);
    return returnResponseError(res, 'Could not search videos');
  }
});

export default router;

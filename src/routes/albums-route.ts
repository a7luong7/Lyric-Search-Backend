import express from 'express';
import { searchReleaseGroup, searchReleaseCoverArt } from '../service/albums-service';
import {
  getBaseArtist, getBaseAlbum, returnResponseSuccess, returnResponseError, returnBadRequest,
  logError,
} from '../utils';

require('express-async-errors');

const router = express.Router();

router.get('/search', async (req:express.Request, res:express.Response) => {
  if (!req.query.artist || !req.query.albumTitle) {
    return returnBadRequest(res, 'Please provide both the artist name and album title');
  }

  const artist = getBaseArtist(req.query.artist as string);
  const albumTitle = getBaseAlbum(req.query.albumTitle as string);

  try {
    const releaseGroupsRes = await searchReleaseGroup(albumTitle as string, artist as string);
    if (releaseGroupsRes.count === 0 || !releaseGroupsRes['release-groups']) {
      return res.status(404).json({ error: 'Release not found' });
    }
    const releaseGroup = releaseGroupsRes['release-groups'][0];
    const release = releaseGroup.releases[0];

    const coverArtRes = await searchReleaseCoverArt(release.id as string);
    if (coverArtRes.images.length !== 0) {
      // release.album_coverart = coverArtRes.images[0].thumbnails.small;
    }
    return returnResponseSuccess(res, release);
  } catch (e) {
    logError(e);
    return returnResponseError(res, 'Error occurred searching for album');
  }
});

export default router;

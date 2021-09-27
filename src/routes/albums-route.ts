import express from 'express';
import { searchAlbum, searchAlbumArt } from '../service/albums-service';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { artist } = req.query;
  const { albumTitle } = req.query;
  if (!artist || !albumTitle) { return res.status(400).json({ error: 'Please provide both the artist name and album title' }); }

  const albumRes = await searchAlbum(albumTitle as string, artist as string);
  console.log('album res', albumRes);
  if (albumRes.count === 0 || !albumRes.releases) { return res.status(200).json({ }); }
  const album = albumRes.releases[0];

  const albumArtRes = await searchAlbumArt(album.id as string);
  if (albumArtRes.images.length !== 0) {
    album.album_coverart = albumArtRes.images[0].thumbnails.small;
  }
  return res.status(200).json(album);
});

export default router;

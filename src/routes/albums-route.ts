import express from 'express';
import { searchAlbum, searchAlbumArt } from '../service/albums-service';

const router = express.Router();

router.get('/search', async (req, res) => {
  let artist = req.query.artist as string;
  let albumTitle = req.query.albumTitle as string;
  if (!artist || !albumTitle) { return res.status(400).json({ error: 'Please provide both the artist name and album title' }); }

  if (artist.includes('feat.')) { artist = artist.substring(0, artist.indexOf('feat.')); }
  if (albumTitle.includes('(')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('(')); }
  if (albumTitle.endsWith('- Single')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('- Single')); }

  console.log('artist', artist);
  console.log('albim title', albumTitle);

  try {
    const albumRes = await searchAlbum(albumTitle as string, artist as string);
    // console.log('album res', albumRes);
    if (albumRes.count === 0 || !albumRes.releases) { return res.status(200).json({ }); }
    const albumsWithPackaging = albumRes.releases.filter((x) => x['packaging-id']);
    // console.log('albums with packaging', albumsWithPackaging);
    const album = albumsWithPackaging.length > 0
      ? albumsWithPackaging[0]
      : albumRes.releases[0];
    // const album = albumRes.releases[0];
    console.log(`album ${album.title} is of type ${album['release-group']['primary-type']}`);
    const albumArtRes = await searchAlbumArt(album.id as string);
    if (albumArtRes.images.length !== 0) {
      album.album_coverart = albumArtRes.images[0].thumbnails.small;
    }
    return res.status(200).json(album);
  } catch (e) {
    // console.log('error', e);
    return res.status(200).json({ });
  }
});

export default router;

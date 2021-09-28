import axios from 'axios';
import { sampleAlbumArt, sampleAlbums } from '../data';
import { AlbumRes, AlbumArtRes, Song } from '../types';

export const searchAlbum = async (title:string, artist:string) : Promise<AlbumRes> => {
  const limit = 5;
  const primaryType = 'album';
  const baseUrl = 'https://musicbrainz.org/ws/2/release';
  const url = `${baseUrl}?query=release:"${title}" AND artist:"${artist}"&limit=${limit}`;

  console.log('album search url', url);
  // return sampleAlbums;
  return axios.get(url).then((res) => res.data);
};

export const searchAlbumArt = async (id:string) : Promise<AlbumArtRes> => {
  const url = `http://coverartarchive.org/release/${id}`;
  // return sampleAlbumArt;
  return axios.get(url).then((res) => res.data);
};

export const getAlbumFromSong = async (song:Song) => {
  try {
    const albumRes = await searchAlbum(song.track.album_name, song.track.artist_name);
    if (albumRes.count === 0 || !albumRes.releases) return null;
    const albumsWithPackaging = albumRes.releases.filter((x) => x['packaging-id']);
    const album = albumsWithPackaging.length > 0
      ? albumsWithPackaging[0]
      : albumRes.releases[0];

    console.log(`album ${album.title} is of type ${album['release-group']['primary-type']}`);

    const albumArtRes = await searchAlbumArt(album.id as string);
    if (albumArtRes.images.length !== 0) {
      album.album_coverart = albumArtRes.images[0].thumbnails.small;
    }
    return album;
  } catch (e) {
    // console.log('error', e);
    return null;
  }
};

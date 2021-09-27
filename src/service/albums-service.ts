import axios from 'axios';
import { sampleAlbumArt, sampleAlbums } from '../data';
import { AlbumRes, AlbumArtRes } from '../types';

export const searchAlbum = async (title:string, artist:string) : Promise<AlbumRes> => {
  const limit = 5;
  const primaryType = 'album';
  const baseUrl = 'https://musicbrainz.org/ws/2/release';
  const url = `${baseUrl}?query=release:"${title}" AND artist:"${artist}" AND primarytype:"${primaryType}"&limit=${limit}`;

  console.log('album search url', url);
  return sampleAlbums;
  // return axios.get(url).then((res) => res.data);
};

export const searchAlbumArt = async (id:string) : Promise<AlbumArtRes> => {
  const url = `http://coverartarchive.org/release/${id}`;
  return sampleAlbumArt;
  return axios.get(url).then((res) => res.data);
};

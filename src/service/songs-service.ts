import axios from 'axios';
import { sampleSongs, sampleAlbumArt, sampleAlbums } from '../data';
import { MUSIXMATCH_API_KEY } from '../config';

export const searchSongs = async (lyrics:string) => {
  const page = 1;
  const apiKey = MUSIXMATCH_API_KEY;
  const baseUrl = 'https://api.musixmatch.com/ws/1.1/track.search';
  const url = `${baseUrl}?page=${page}&apikey=${apiKey}&q_lyrics=${lyrics}`;
  //   const config = {
  //     headers: { 'Access-Control-Allow-Origin': '*' },
  //   };

  console.log('music match url', url);
  //   return axios.get(url).then((res) => {
  //     const { data } = res;
  //     return data.message.body;
  //   });
  return sampleSongs;
};

export const searchAlbum = async (title:string, artist:string) => {
  const limit = 5;
  const primaryType = 'album';
  const baseUrl = 'https://musicbrainz.org/ws/2/release';
  const url = `${baseUrl}?query=release:"${title}" AND artist:"${artist}" AND primarytype:"${primaryType}"&limit=${limit}`;

  // console.log('album search url', baseUrl);
  return sampleAlbums;
  return axios.get(url).then((res) => res.data);
};

export const searchAlbumArt = async (id:string) => {
  const url = `http://coverartarchive.org/release/${id}`;
  return sampleAlbumArt;
  return axios.get(url).then((res) => res.data);
};

// export default {};

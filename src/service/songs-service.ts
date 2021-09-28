import axios from 'axios';
import { sampleSongs, sampleAlbumArt, sampleAlbums } from '../data';
import { SongLookupRes } from '../types';
import { MUSIXMATCH_API_KEY } from '../config';

export const searchSongs = async (lyrics:string) : Promise<SongLookupRes> => {
  const page = 1;
  const apiKey = MUSIXMATCH_API_KEY;
  const baseUrl = 'https://api.musixmatch.com/ws/1.1/track.search';
  const url = `${baseUrl}`
    + `?page=${page}`
    + `&apikey=${apiKey}`
    + '&s_track_rating=desc'
    // + '&s_artist_rating=desc'
    + `&q_lyrics=${encodeURI(lyrics)}`;

  console.log('music match url', url);

  return axios.get(url).then((res) => {
    const { data } = res;
    // console.log('api res', data);
    return data.message.body;
  });
  // return sampleSongs;
};

export default {};

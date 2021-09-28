import axios from 'axios';
import { sampleSongs, sampleAlbumArt, sampleAlbums } from '../data';
import { Song, SongLookupRes } from '../types';
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

export const getSongStart = (title:string) : string => {
  if (!title.includes('-')) { return title; }
  return title.substring(0, title.indexOf('-')).trim();
};

// Multiple versions/releases of same song by the same artist may exist. Only one should be included
export const filterSongs = (songs:Song[]) : Song[] => {
  let filteredSongs = <Song[]>[];
  songs.forEach((song) => {
    const artistName = song.track.artist_name;
    const songName = song.track.track_name;
    const songStart = getSongStart(songName);
    const similarSongs = filteredSongs.filter((x) => x.track.artist_name === artistName);
    // console.log('comparing song ', songStart);
    const sameSongs = similarSongs.filter((x) => x.track.track_name.startsWith(songStart)
        || songName.startsWith(getSongStart(x.track.track_name)));
    if (similarSongs.length === 0 || sameSongs.length === 0) {
      filteredSongs.push(song);
    } else {
      // console.log('encountering similar song');
      const shortestSameSong = sameSongs.sort((a, b) => {
        if (a.track.track_name.length > b.track.track_name.length) return 1;
        if (a.track.track_name.length < b.track.track_name.length) return -1;
        return 0;
      })[0];
      if (songName.length < shortestSameSong.track.track_name.length) {
        filteredSongs = filteredSongs
          .filter((x) => x.track.track_id !== shortestSameSong.track.track_id);
        filteredSongs.push(song);
      } else { }
    }
  });
  return filteredSongs;
};

export default {};

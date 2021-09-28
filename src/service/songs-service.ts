import axios from 'axios';
import { sampleSongs, sampleAlbumArt, sampleAlbums } from '../data';
import { Song, MusixMatchTrackSearchRes } from '../types';
import { MUSIXMATCH_API_KEY } from '../config';

export const convertMusixMatchToSongs = (data:MusixMatchTrackSearchRes) : Song[] => {
  if (!data || !data.message || !data.message.body || !data.message.body.track_list) { return []; }

  const songs = data.message.body.track_list
    .map(({ track }) => ({
      track_id: track.track_id,
      track_name: track.track_name,
      track_rating: track.track_rating,
      artist_name: track.artist_name,
      album_id: track.album_id,
      album_name: track.album_name,
      album_coverart: track.album_coverart,
    }));
  return songs;
};

export const searchSongs = async (lyrics:string) : Promise<Song[]> => {
  const page = 1;
  const apiKey = MUSIXMATCH_API_KEY;
  const baseUrl = 'https://api.musixmatch.com/ws/1.1/track.search';
  const url = `${baseUrl}`
    + `?page=${page}`
    + `&apikey=${apiKey}`
    + '&s_track_rating=desc'
    + `&q_lyrics=${encodeURI(lyrics)}`;

  // return axios.get(url).then((res) => convertMusixMatchToSongs(res.data));
  return convertMusixMatchToSongs(sampleSongs);
};

export const getSongStart = (title:string) : string => {
  if (!title.includes('-')) { return title; }
  return title.substring(0, title.indexOf('-')).trim();
};

// Multiple versions/releases of same song by the same artist may exist. Only one should be included
export const filterSongs = (songs:Song[]) : Song[] => {
  let filteredSongs = <Song[]>[];
  songs.forEach((song) => {
    const artistName = song.artist_name;
    const songName = song.track_name;
    const songStart = getSongStart(songName);
    const sameArtistSongs = filteredSongs.filter((x) => x.artist_name === artistName);
    const sameSongs = sameArtistSongs.filter((x) => x.track_name.startsWith(songStart)
      || songName.startsWith(getSongStart(x.track_name)));

    if (sameSongs.length === 0) {
      filteredSongs.push(song);
    } else {
      const shortestSameSong = sameSongs.sort((a, b) => {
        if (a.track_name.length > b.track_name.length) return 1;
        if (a.track_name.length < b.track_name.length) return -1;
        return 0;
      })[0];
      if (songName.length < shortestSameSong.track_name.length) {
        filteredSongs = filteredSongs.filter((x) => x.track_id !== shortestSameSong.track_id);
        filteredSongs.push(song);
      }
    }
  });
  return filteredSongs;
};

export default {};

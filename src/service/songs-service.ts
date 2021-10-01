import axios from 'axios';
import { sampleSongs, sampleSearchResults, sampleLyrics } from '../data';
import { Song, MusixMatchTrackSearchRes, MusixMatchLyricsRes } from '../types';
import { MUSIXMATCH_API_KEY, GENIUS_API_KEY } from '../config';

// export const convertMusixMatchToSongs = (data:MusixMatchTrackSearchRes) : Song[] => {
//   if (!data || !data.message || !data.message.body || !data.message.body.track_list) { return []; }

//   const songs = data.message.body.track_list
//     .map(({ track }) => ({
//       track_id: track.track_id,
//       track_name: track.track_name,
//       track_rating: track.track_rating,
//       artist_name: track.artist_name,
//       album_id: track.album_id,
//       album_name: track.album_name,
//       album_coverart: track.album_coverart,
//     }));
//   return songs;
// };

export const convertGeniusSearchResToSongs = (data:any) : Song[] => {
  if (!data || !data.response || data.response.hits.length === 0) return [];
  const songResults = data.response.hits.filter((x:any) => x.type === 'song');
  if (songResults.length === 0) return [];

  // eslint-disable-next-line arrow-body-style
  const songs = songResults.map((hit:any) => {
    const song = hit.result;
    return {
      id: song.id,
      api_path: song.api_path,
      full_title: song.full_title,
      title: song.title,
      title_with_featured: song.title_with_featured,
      artist: song.primary_artist.name,
      lyrics_state: song.lyrics_state,
      lyrics_owner_id: song.lyrics_owner_id,
      song_art_image_url: song.song_art_image_url,
      song_art_image_thumbnail_url: song.song_art_image_thumbnail_url,
      header_image_url: song.header_image_url,
      header_image_thumbnail_url: song.header_image_thumbnail_url,
    };
  });
  return songs;
};

export const searchSongs = async (lyrics:string) : Promise<Song[]> => {
  const page = 1;
  const baseUrl = 'https://api.genius.com/search';
  const url = `${baseUrl}?q=${encodeURI(lyrics)}`;
  const config = {
    headers: { Authorization: `Bearer ${GENIUS_API_KEY}` },
  };
  return convertGeniusSearchResToSongs(sampleSearchResults);
  // return axios.get(url, config).then((res) => convertGeniusSearchResToSongs(res.data));
};

// export const searchSongs = async (lyrics:string) : Promise<Song[]> => {
//   const page = 1;
//   const baseUrl = 'https://api.musixmatch.com/ws/1.1/track.search';
//   const url = `${baseUrl}`
//     + `?page=${page}`
//     + `&apikey=${MUSIXMATCH_API_KEY}`
//     + '&s_track_rating=desc'
//     + `&q_lyrics=${encodeURI(lyrics)}`;

//   return convertMusixMatchToSongs(sampleSongs);
//   return axios.get(url).then((res) => convertMusixMatchToSongs(res.data));
// };

export const getSongStart = (title:string) : string => {
  if (!title.includes('-')) { return title; }
  return title.substring(0, title.indexOf('-')).trim();
};

// Multiple versions/releases of same song by the same artist may exist. Only one should be included
// export const filterSongs = (songs:Song[]) : Song[] => {
//   let filteredSongs = <Song[]>[];
//   songs.forEach((song) => {
//     const artistName = song.artist_name;
//     const songName = song.track_name;
//     const songStart = getSongStart(songName);
//     const sameArtistSongs = filteredSongs.filter((x) => x.artist_name === artistName);
//     const sameSongs = sameArtistSongs.filter((x) => x.track_name.startsWith(songStart)
//       || songName.startsWith(getSongStart(x.track_name)));

//     if (sameSongs.length === 0) {
//       filteredSongs.push(song);
//     } else {
//       const shortestSameSong = sameSongs.sort((a, b) => {
//         if (a.track_name.length > b.track_name.length) return 1;
//         if (a.track_name.length < b.track_name.length) return -1;
//         return 0;
//       })[0];

//       if (songName.length < shortestSameSong.track_name.length) {
//         filteredSongs = filteredSongs.filter((x) => x.track_id !== shortestSameSong.track_id);
//         filteredSongs.push(song);
//       }
//     }
//   });
//   return filteredSongs;
// };

export const getSongLyrics = async (trackID:number) : Promise<MusixMatchLyricsRes> => {
  const baseUrl = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get';
  const url = `${baseUrl}`
    + `?track_id=${trackID}`
    + `&apikey=${MUSIXMATCH_API_KEY}`;

  return sampleLyrics;
  return axios.get(url).then((res) => res.data);
};

export default {};

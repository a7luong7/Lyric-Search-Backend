import axios from 'axios';
import {
  sampleSearchResults, sampleLyricsResults, sampleLyricsRaw, sampleSong,
} from '../data';
import { Song, SongWithLyricsHighlight, SongSearchResponse } from '../types';
import { GENIUS_API_KEY } from '../config';

const cheerio = require('cheerio');

// Malicious links can be embedded into song thumbnails
// Use default img thumbnail if url is not hosted on genius.com assets
const getThumbOrDefault = (url:string) : string => {
  if (!url) { return url; }
  if (!url.startsWith('https://images.genius.com') && !url.startsWith('https://assets.genius.com')) {
    return 'https://assets.genius.com/images/default_cover_image.png?1633111074';
  }
  return url;
};

const convertSongResult = (song:any) : Song => ({
  id: song.id,
  api_path: song.api_path,
  path: song.path,
  full_title: song.full_title,
  title: song.title,
  title_with_featured: song.title_with_featured,
  artist: song.primary_artist.name,
  lyrics_state: song.lyrics_state,
  lyrics_owner_id: song.lyrics_owner_id,
  song_art_image_url: getThumbOrDefault(song.song_art_image_url),
  song_art_image_thumbnail_url: getThumbOrDefault(song.song_art_image_thumbnail_url),
  header_image_url: getThumbOrDefault(song.header_image_url),
  header_image_thumbnail_url: getThumbOrDefault(song.header_image_thumbnail_url),
});

export const convertGeniusLyricSearchResToSongs = (data: any) : SongSearchResponse | null => {
  if (!data || !data.meta || data.meta.status !== 200) { return null; }

  const lyricSection = data.response.sections.find((x:any) => x.type === 'lyric');
  if (!lyricSection || lyricSection.hits === 0) {
    return <SongSearchResponse>{
      songs: [],
      nextPage: null,
    };
  }

  const songs = lyricSection.hits.map((hit:any) => {
    const song = hit.result;
    const convertedSong = convertSongResult(song);
    return {
      ...convertedSong,
      highlights: hit.highlights,
    };
  });

  const response = <SongSearchResponse>{
    songs,
    nextPage: data.response.next_page,
  };

  return response;
};

export const convertGeniusSearchResToSongs = (data:any) : Song[] => {
  if (!data || !data.response || data.response.hits.length === 0) return [];
  const songResults = data.response.hits.filter((x:any) => x.type === 'song');
  if (songResults.length === 0) return [];

  // eslint-disable-next-line arrow-body-style
  const songs = songResults.map((hit:any) => {
    const song = hit.result;
    return convertSongResult(song);
  });
  return songs;
};

export const getSong = async (id:number) => {
  const baseUrl = 'https://genius.com/api/songs';
  const url = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: `Bearer ${GENIUS_API_KEY}` },
  };

  // const songResult = sampleSong;
  const songResult = (await axios.get(url, config)).data;
  return convertSongResult(songResult.response.song);
};

export const searchSongs = async (lyrics:string) : Promise<Song[]> => {
  const baseUrl = 'https://api.genius.com/search';
  const url = `${baseUrl}?q=${encodeURI(lyrics)}`;
  const config = {
    headers: { Authorization: `Bearer ${GENIUS_API_KEY}` },
  };
  // return convertGeniusSearchResToSongs(sampleSearchResults);
  return axios.get(url, config).then((res) => convertGeniusSearchResToSongs(res.data));
};

export const searchSongsWithLyrics = async (lyrics:string, page:number)
: Promise<SongSearchResponse | null> => {
  const baseUrl = 'https://genius.com/api/search/lyric';
  const url = `${baseUrl}?q=${encodeURI(lyrics)}&page=${page}`;
  // return convertGeniusLyricSearchResToSongs(sampleLyricsResults);
  return axios.get(url).then((res) => convertGeniusLyricSearchResToSongs(res.data));
};

const parseLyricsFromGeniusHTML = (html:string) : string => {
  const $ = cheerio.load(html);

  let lyrics = '';
  $('#lyrics-root div[class^="Lyrics__Container"]').each((i:number, elem:any) => {
    $(elem).find('a').each((j:number, link:any) => $(link).replaceWith($(link).html()));
    $(elem).find('span').each((j:number, span:any) => $(span).replaceWith($(span).html()));
    $(elem).find('span').each((j:number, span:any) => $(span).replaceWith($(span).html()));

    $(elem).find('i').each((j:number, span:any) => $(span).replaceWith($(span).text()));
    $(elem).find('b').each((j:number, span:any) => $(span).replaceWith($(span).text()));
    lyrics += $(elem).html();
    lyrics += '<br>';
  });
  return lyrics;
};

export const getSongLyrics = async (lyricsPath:string) : Promise<string> => {
  const baseUrl = 'https://genius.com';
  const url = `${baseUrl}${lyricsPath}`;
  // return parseLyricsFromGeniusHTML(sampleLyricsRaw);
  return axios.get(url).then((result) => parseLyricsFromGeniusHTML(result.data));
};

export default {};

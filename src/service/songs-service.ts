import axios from 'axios';
import { sampleSearchResults, sampleLyricsRaw } from '../data';
import { Song, MusixMatchLyricsRes } from '../types';
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
  // return convertGeniusSearchResToSongs(sampleSearchResults);
  return axios.get(url, config).then((res) => convertGeniusSearchResToSongs(res.data));
};

const parseLyricsFromGeniusHTML = (html:string) : string => {
  const $ = cheerio.load(html);

  let lyrics = '';
  $('#lyrics-root div[class^="Lyrics__Container"]').each((i:number, elem:any) => {
    $(elem).find('a').each((j:number, link:any) => $(link).replaceWith($(link).html()));
    $(elem).find('span').each((j:number, span:any) => $(span).replaceWith($(span).html()));
    $(elem).find('span').each((j:number, span:any) => $(span).replaceWith($(span).html()));
    lyrics += $(elem).html();
    lyrics += '<br/>';
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

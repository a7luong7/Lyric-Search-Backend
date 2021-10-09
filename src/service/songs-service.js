"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSongLyrics = exports.searchSongsWithLyrics = exports.searchSongs = exports.getSong = exports.convertGeniusSearchResToSongs = exports.convertGeniusLyricSearchResToSongs = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const cheerio = require('cheerio');
// Malicious links can be embedded into song thumbnails
// Use default img thumbnail if url is not hosted on genius.com assets
const getThumbOrDefault = (url) => {
    if (!url) {
        return url;
    }
    if (!url.startsWith('https://images.genius.com') && !url.startsWith('https://assets.genius.com')) {
        return 'https://assets.genius.com/images/default_cover_image.png?1633111074';
    }
    return url;
};
const convertSongResult = (song) => ({
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
const convertGeniusLyricSearchResToSongs = (data) => {
    if (!data || !data.meta || data.meta.status !== 200) {
        return null;
    }
    const lyricSection = data.response.sections.find((x) => x.type === 'lyric');
    if (!lyricSection || lyricSection.hits === 0) {
        return {
            songs: [],
            nextPage: null,
        };
    }
    const songs = lyricSection.hits.map((hit) => {
        const song = hit.result;
        const convertedSong = convertSongResult(song);
        return Object.assign(Object.assign({}, convertedSong), { highlights: hit.highlights });
    });
    const response = {
        songs,
        nextPage: data.response.next_page,
    };
    return response;
};
exports.convertGeniusLyricSearchResToSongs = convertGeniusLyricSearchResToSongs;
const convertGeniusSearchResToSongs = (data) => {
    if (!data || !data.response || data.response.hits.length === 0)
        return [];
    const songResults = data.response.hits.filter((x) => x.type === 'song');
    if (songResults.length === 0)
        return [];
    // eslint-disable-next-line arrow-body-style
    const songs = songResults.map((hit) => {
        const song = hit.result;
        return convertSongResult(song);
    });
    return songs;
};
exports.convertGeniusSearchResToSongs = convertGeniusSearchResToSongs;
const getSong = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'https://genius.com/api/songs';
    const url = `${baseUrl}/${id}`;
    const config = {
        headers: { Authorization: `Bearer ${config_1.GENIUS_API_KEY}` },
    };
    // const songResult = sampleSong;
    const songResult = (yield axios_1.default.get(url, config)).data;
    return convertSongResult(songResult.response.song);
});
exports.getSong = getSong;
const searchSongs = (lyrics) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'https://api.genius.com/search';
    const url = `${baseUrl}?q=${encodeURI(lyrics)}`;
    const config = {
        headers: { Authorization: `Bearer ${config_1.GENIUS_API_KEY}` },
    };
    // return convertGeniusSearchResToSongs(sampleSearchResults);
    return axios_1.default.get(url, config).then((res) => (0, exports.convertGeniusSearchResToSongs)(res.data));
});
exports.searchSongs = searchSongs;
const searchSongsWithLyrics = (lyrics, page) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'https://genius.com/api/search/lyric';
    const url = `${baseUrl}?q=${encodeURI(lyrics)}&page=${page}`;
    // return convertGeniusLyricSearchResToSongs(sampleLyricsResults);
    return axios_1.default.get(url).then((res) => (0, exports.convertGeniusLyricSearchResToSongs)(res.data));
});
exports.searchSongsWithLyrics = searchSongsWithLyrics;
const parseLyricsFromGeniusHTML = (html) => {
    const $ = cheerio.load(html);
    let lyrics = '';
    $('#lyrics-root div[class^="Lyrics__Container"]').each((i, elem) => {
        $(elem).find('a').each((j, link) => $(link).replaceWith($(link).html()));
        $(elem).find('span').each((j, span) => $(span).replaceWith($(span).html()));
        $(elem).find('span').each((j, span) => $(span).replaceWith($(span).html()));
        $(elem).find('i').each((j, span) => $(span).replaceWith($(span).text()));
        $(elem).find('b').each((j, span) => $(span).replaceWith($(span).text()));
        lyrics += $(elem).html();
        lyrics += '<br>';
    });
    return lyrics;
};
const getSongLyrics = (lyricsPath) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'https://genius.com';
    const url = `${baseUrl}${lyricsPath}`;
    // return parseLyricsFromGeniusHTML(sampleLyricsRaw);
    return axios_1.default.get(url).then((result) => parseLyricsFromGeniusHTML(result.data));
});
exports.getSongLyrics = getSongLyrics;
exports.default = {};

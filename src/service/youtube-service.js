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
exports.searchVideos = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const config_1 = require("../config");
const convertYoutubeResults = (data) => {
    if (!data || !data.items || data.items.length === 0) {
        return [];
    }
    const results = data.items.map((item) => {
        const { snippet } = item;
        return {
            videoID: item.id.videoId,
            channelID: snippet.channelID,
            title: snippet.title,
            description: snippet.description,
            publishedAt: snippet.publishedAt,
            thumbnails: {
                default: snippet.thumbnails.default.url,
                medium: snippet.thumbnails.medium.url,
                high: snippet.thumbnails.high.url,
            },
        };
    });
    return results;
};
const searchVideos = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'https://youtube.googleapis.com/youtube/v3/search';
    const url = `${baseUrl}`
        + '?part=snippet'
        + '&type=video'
        + `&q=${encodeURI(query)} `
        + '&maxResults=3'
        // + '&order=viewCount'
        + `&key=${config_1.YOUTUBE_API_KEY}`;
    // return convertYoutubeResults(sampleYoutubeResults);
    return axios_1.default.get(url)
        .then((res) => convertYoutubeResults(res.data))
        .catch((e) => {
        (0, utils_1.logError)(e);
        (0, utils_1.logError)(`youtube search error: ${url}`);
    });
});
exports.searchVideos = searchVideos;
exports.default = {};

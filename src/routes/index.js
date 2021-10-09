"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeRouter = exports.albumsRouter = exports.songsRouter = void 0;
const songs_route_1 = __importDefault(require("./songs-route"));
exports.songsRouter = songs_route_1.default;
const albums_route_1 = __importDefault(require("./albums-route"));
exports.albumsRouter = albums_route_1.default;
const youtube_route_1 = __importDefault(require("./youtube-route"));
exports.youtubeRouter = youtube_route_1.default;

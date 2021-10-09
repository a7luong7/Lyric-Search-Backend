"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YOUTUBE_API_KEY = exports.GENIUS_API_KEY = exports.MUSIXMATCH_API_KEY = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
require('dotenv').config({ path: './.env' });
const { MUSIXMATCH_API_KEY } = process.env;
exports.MUSIXMATCH_API_KEY = MUSIXMATCH_API_KEY;
const { GENIUS_API_KEY } = process.env;
exports.GENIUS_API_KEY = GENIUS_API_KEY;
const { YOUTUBE_API_KEY } = process.env;
exports.YOUTUBE_API_KEY = YOUTUBE_API_KEY;

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
const express_1 = __importDefault(require("express"));
const songs_service_1 = require("../service/songs-service");
const utils_1 = require("../utils");
require('express-async-errors');
const router = express_1.default.Router();
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lyrics } = req.query;
    if (!lyrics) {
        return (0, utils_1.returnBadRequest)(res, 'Please provide both the artist name and album title');
    }
    const pageNum = Number(req.query.page);
    const page = Number.isNaN(pageNum) ? 1 : pageNum;
    try {
        const songSearchRes = yield (0, songs_service_1.searchSongsWithLyrics)(lyrics, page);
        return (0, utils_1.returnResponseSuccess)(res, songSearchRes); // Premature return for resting
    }
    catch (e) {
        (0, utils_1.logError)(e);
        return (0, utils_1.returnResponseError)(res, 'Could not search songs');
    }
}));
router.get('/lyrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lyricsPath = req.query.path;
    if (!lyricsPath) {
        return (0, utils_1.returnBadRequest)(res, 'Please provide path to lyrics');
    }
    const lyrics = yield (0, songs_service_1.getSongLyrics)(lyricsPath);
    if (lyrics) {
        const lyricsJson = { lyrics };
        return (0, utils_1.returnResponseSuccess)(res, lyricsJson);
    }
    return (0, utils_1.returnResponseError)(req, 'Could not get lyrics');
}));
router.get('/songs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || Number.isNaN(Number(id))) {
        return (0, utils_1.returnBadRequest)(res, 'Please provide a valid song ID');
    }
    const song = yield (0, songs_service_1.getSong)(Number(id));
    return (0, utils_1.returnResponseSuccess)(res, song);
}));
exports.default = router;

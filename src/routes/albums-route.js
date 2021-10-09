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
const albums_service_1 = require("../service/albums-service");
const utils_1 = require("../utils");
require('express-async-errors');
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.artist || !req.query.albumTitle) {
        return (0, utils_1.returnBadRequest)(res, 'Please provide both the artist name and album title');
    }
    const artist = (0, utils_1.getBaseArtist)(req.query.artist);
    const albumTitle = (0, utils_1.getBaseAlbum)(req.query.albumTitle);
    try {
        const releaseGroupsRes = yield (0, albums_service_1.searchReleaseGroup)(albumTitle, artist);
        if (releaseGroupsRes.count === 0 || !releaseGroupsRes['release-groups']) {
            return res.status(404).json({ error: 'Release not found' });
        }
        const releaseGroup = releaseGroupsRes['release-groups'][0];
        const release = releaseGroup.releases[0];
        const coverArtRes = yield (0, albums_service_1.searchReleaseCoverArt)(release.id);
        if (coverArtRes.images.length !== 0) {
            // release.album_coverart = coverArtRes.images[0].thumbnails.small;
        }
        return (0, utils_1.returnResponseSuccess)(res, release);
    }
    catch (e) {
        (0, utils_1.logError)(e);
        return (0, utils_1.returnResponseError)(res, 'Error occurred searching for album');
    }
}));
exports.default = router;

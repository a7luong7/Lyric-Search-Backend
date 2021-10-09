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
exports.getReleaseFromSong = exports.searchReleaseCoverArt = exports.getReleaseGroupAlbums = exports.searchReleaseGroup = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const searchReleaseGroup = (title, artist) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 1;
    const baseUrl = 'https://musicbrainz.org/ws/2/release-group';
    const url = `${baseUrl}`
        + `?query=release:${encodeURI(title)} `
        + `AND artist:${encodeURI(artist)}`
        + `&limit=${limit}`
        + '&fmt=json';
    // return sampleReleaseGroups;
    return axios_1.default.get(url)
        .then((res) => res.data)
        .catch((e) => {
        (0, utils_1.logError)(e);
        (0, utils_1.logError)(`release group error ${url}`);
    });
});
exports.searchReleaseGroup = searchReleaseGroup;
const getReleaseGroupAlbums = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = 'https://musicbrainz.org/ws/2/release';
    const url = `${baseUrl}/?release-group=${id}&fmt=json`;
    // return sampleReleases;
    return axios_1.default.get(url)
        .then((res) => res.data.releases)
        .catch((e) => {
        (0, utils_1.logError)(e);
        (0, utils_1.logError)(`release group albums error ${url}`);
    });
});
exports.getReleaseGroupAlbums = getReleaseGroupAlbums;
const searchReleaseCoverArt = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `http://coverartarchive.org/release/${id}-250`;
    // return sampleAlbumArt;
    return axios_1.default.get(url)
        .then((res) => res.data)
        .catch((e) => {
        (0, utils_1.logError)(e);
        (0, utils_1.logError)(`get cover art error ${url}`);
    });
});
exports.searchReleaseCoverArt = searchReleaseCoverArt;
const getReleaseFromSong = (song) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artist = (0, utils_1.getBaseArtist)(song.artist);
        const albumTitle = '';
        // const albumTitle = getBaseAlbum(song.);
        const releaseGroupRes = yield (0, exports.searchReleaseGroup)(albumTitle, artist);
        if (releaseGroupRes.count === 0 || !releaseGroupRes['release-groups']) {
            return null;
        }
        const releaseGroupsFiltered = releaseGroupRes['release-groups'].filter((x) => x.score > 90);
        const releaseGroupsSorted = (0, utils_1.sortBy)(releaseGroupsFiltered, 'count');
        const releaseGroup = releaseGroupsSorted[0];
        if (releaseGroup['primary-type'] !== 'Album' && releaseGroup['primary-type'] !== 'Single') {
            return null;
        }
        const releasesRes = yield (0, exports.getReleaseGroupAlbums)(releaseGroup.id);
        if (releasesRes['release-count'] === 0) {
            return null;
        }
        const releasesWithArt = releasesRes.releases.filter((x) => x['cover-art-archive'].count > 0);
        const releaseWithArt = releasesWithArt[0];
        if (releasesWithArt.length > 0) {
            releaseWithArt.album_coverart = `http://coverartarchive.org/release/${releaseWithArt.id}/front`;
        }
        return releaseWithArt;
    }
    catch (e) {
        (0, utils_1.logError)(e);
        return null;
    }
});
exports.getReleaseFromSong = getReleaseFromSong;

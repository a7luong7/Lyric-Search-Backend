"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBadRequest = exports.returnResponseError = exports.returnResponseSuccess = exports.logError = exports.getBaseAlbum = exports.getBaseArtist = exports.wait = exports.sortBy = void 0;
/* eslint-disable arrow-body-style */
const sortBy = (array, field, direction = 'asc') => {
    return array.sort((a, b) => {
        if (a[field] > b[field])
            return (direction === 'asc' ? 1 : -1);
        if (a[field] < b[field])
            return (direction === 'asc' ? -1 : 1);
        return 0;
    });
};
exports.sortBy = sortBy;
const wait = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
exports.wait = wait;
const getBaseArtist = (artist) => {
    let baseArtist = artist;
    if (artist.includes('feat.')) {
        baseArtist = artist.substring(0, baseArtist.indexOf('feat.')).trim();
    }
    return baseArtist;
};
exports.getBaseArtist = getBaseArtist;
const getBaseAlbum = (album) => {
    let baseAlbum = album;
    if (baseAlbum.includes('(')) {
        baseAlbum = baseAlbum.substring(0, baseAlbum.indexOf('(')).trim();
    }
    if (baseAlbum.endsWith('- Single')) {
        baseAlbum = baseAlbum.substring(0, baseAlbum.indexOf('- Single')).trim();
    }
    if (baseAlbum.endsWith('- Side A')) {
        baseAlbum = baseAlbum.substring(0, baseAlbum.indexOf('- Side A')).trim();
    }
    if (baseAlbum.endsWith('- Side B')) {
        baseAlbum = baseAlbum.substring(0, baseAlbum.indexOf('- Side B')).trim();
    }
    return baseAlbum;
};
exports.getBaseAlbum = getBaseAlbum;
const logError = (errorMessage) => {
    console.log(errorMessage);
};
exports.logError = logError;
const returnResponseSuccess = (res, payload) => {
    return payload !== null
        ? res.status(200).json(payload)
        : res.status(200).end();
};
exports.returnResponseSuccess = returnResponseSuccess;
const returnResponseError = (res, errroMessage) => {
    return res.status(500).json({
        error: errroMessage,
    });
};
exports.returnResponseError = returnResponseError;
const returnBadRequest = (res, errroMessage) => {
    return res.status(404).json({
        error: errroMessage,
    });
};
exports.returnBadRequest = returnBadRequest;
exports.default = {};

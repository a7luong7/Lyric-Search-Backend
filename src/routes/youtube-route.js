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
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const youtube_service_1 = require("../service/youtube-service");
const utils_1 = require("../utils");
require('express-async-errors');
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { queryString } = req.query;
    if (!queryString) {
        return (0, utils_1.returnBadRequest)(res, 'Please provide a query string for the video');
    }
    try {
        const searchVideosRes = yield (0, youtube_service_1.searchVideos)(queryString);
        return (0, utils_1.returnResponseSuccess)(res, searchVideosRes); // Premature return for resting
    }
    catch (e) {
        (0, utils_1.logError)(e);
        return (0, utils_1.returnResponseError)(res, 'Could not search videos');
    }
}));
exports.default = router;

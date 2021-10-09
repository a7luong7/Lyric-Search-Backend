"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const path = require('path');
require('express-async-errors');
const app = (0, express_1.default)();
// app.use(express.static('build'));
app.use(express_1.default.static(path.join('build')));
app.use(express_1.default.json());
if (process.env.NODE_ENV !== 'production') {
    app.use((0, cors_1.default)());
}
app.use('/api/', routes_1.songsRouter);
app.use('/api/albums', routes_1.albumsRouter);
app.use('/api/videos', routes_1.youtubeRouter);
// 404 catchall
// app.get('*', (req, res) => {
//   res.status(404).json({ error: `Invalid routess${req.path}` });
// });
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../build/index.html`));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    console.log(`Unhandled exception at: ${req.path}`);
    if (process.env.NODE_ENV !== 'production') {
        return res.status(500).send(error);
    }
    return res.status(500).json({ error: 'Internal server error' });
    next(error);
});
app.listen(process.env.PORT, () => { });

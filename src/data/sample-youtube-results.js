"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampleYoutubeResults = {
    kind: 'youtube#searchListResponse',
    etag: 'Pr8X72LrRop-RZiqdaHyuQX29s0',
    nextPageToken: 'CAUQAA',
    regionCode: 'US',
    pageInfo: {
        totalResults: 1000000,
        resultsPerPage: 5,
    },
    items: [
        {
            kind: 'youtube#searchResult',
            etag: 'DImM7FdGWwePpNtttF7wKnqJWHg',
            id: {
                kind: 'youtube#video',
                videoId: 'IhTvifGShw4',
            },
            snippet: {
                publishedAt: '2008-06-18T23:14:29Z',
                channelId: 'UCQPAa4gGBWgHDbHtJedal4w',
                title: 'Sitting, Waiting, Wishing - Jack Johnson',
                description: 'Sitting, Waiting, Wishing - Jack Johnson Album: In Between Dreams It hit 1000 views! Keep them coming. Thanks :]',
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/IhTvifGShw4/default.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/IhTvifGShw4/mqdefault.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/IhTvifGShw4/hqdefault.jpg',
                        width: 480,
                        height: 360,
                    },
                },
                channelTitle: 'berzerkme8',
                liveBroadcastContent: 'none',
                publishTime: '2008-06-18T23:14:29Z',
            },
        },
        {
            kind: 'youtube#searchResult',
            etag: 'SA2TsMoIhOj8QJr5fuoOCiXA0wk',
            id: {
                kind: 'youtube#video',
                videoId: '8chU09dsPWU',
            },
            snippet: {
                publishedAt: '2018-07-31T15:05:30Z',
                channelId: 'UCRa17gWCZmdxEymLdXQhj9A',
                title: 'Sitting, Waiting, Wishing',
                description: 'Provided to YouTube by Universal Music Group Sitting, Waiting, Wishing · Jack Johnson In Between Dreams ℗ 2005 Jack Johnson Released on: 2005-01-01 ...',
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/8chU09dsPWU/default.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/8chU09dsPWU/mqdefault.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/8chU09dsPWU/hqdefault.jpg',
                        width: 480,
                        height: 360,
                    },
                },
                channelTitle: 'Jack Johnson - Topic',
                liveBroadcastContent: 'none',
                publishTime: '2018-07-31T15:05:30Z',
            },
        },
        {
            kind: 'youtube#searchResult',
            etag: '0yMb2ws0ppMrnD1oANmPcQhvZFs',
            id: {
                kind: 'youtube#video',
                videoId: 'UdyigY9orew',
            },
            snippet: {
                publishedAt: '2010-09-15T02:07:42Z',
                channelId: 'UCFY1gD9VMrMdPgLuCaZPojg',
                title: 'Jack Johnson - Sitting Waiting Wishing (Kokua Festival 2010)',
                description: 'Music video by Jack Johnson performing Sitting Waiting Wishing. (C) 2010 Jack Johnson.',
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/UdyigY9orew/default.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/UdyigY9orew/mqdefault.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/UdyigY9orew/hqdefault.jpg',
                        width: 480,
                        height: 360,
                    },
                },
                channelTitle: 'JackJohnsonVEVO',
                liveBroadcastContent: 'none',
                publishTime: '2010-09-15T02:07:42Z',
            },
        },
        {
            kind: 'youtube#searchResult',
            etag: '6gvUGQuxMv4qNTpshDI2T1Tls5Y',
            id: {
                kind: 'youtube#video',
                videoId: '98CugedigQA',
            },
            snippet: {
                publishedAt: '2013-11-15T04:08:57Z',
                channelId: 'UCGdSt5wFXDLTTKSbzQUiI-g',
                title: 'Sitting Waiting Wishing by Jack Johnson (lyrics)',
                description: "Lyrics for Jack Johnson's Sitting, Waiting, Wishing I did not produce this music, the rights go to the studio and Jack Johnson.",
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/98CugedigQA/default.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/98CugedigQA/mqdefault.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/98CugedigQA/hqdefault.jpg',
                        width: 480,
                        height: 360,
                    },
                },
                channelTitle: 'Timtim Lyrics',
                liveBroadcastContent: 'none',
                publishTime: '2013-11-15T04:08:57Z',
            },
        },
        {
            kind: 'youtube#searchResult',
            etag: 'kiY6YK_RuDnar3StwQnOFChY28A',
            id: {
                kind: 'youtube#video',
                videoId: 'y-s-EGfGDQ8',
            },
            snippet: {
                publishedAt: '2008-06-23T07:45:10Z',
                channelId: 'UCn4RQdqQfL_hCaO8_9TwSgw',
                title: 'Jack Johnson - Sitting Waiting Wishing Forward',
                description: 'Took one of my favorite Jack Johnson Videos, which features Jack and band moving backwards, and flipped it forward. Gonna check out Jack Aug.31 in concert ...',
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/y-s-EGfGDQ8/default.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/y-s-EGfGDQ8/mqdefault.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/y-s-EGfGDQ8/hqdefault.jpg',
                        width: 480,
                        height: 360,
                    },
                },
                channelTitle: 'ejicon',
                liveBroadcastContent: 'none',
                publishTime: '2008-06-23T07:45:10Z',
            },
        },
    ],
};
exports.default = sampleYoutubeResults;

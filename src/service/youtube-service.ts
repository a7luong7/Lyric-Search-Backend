import axios from 'axios';
import { sampleYoutubeResults } from '../data';
import { YoutubeSearchResult } from '../types';
import { logError } from '../utils';
import { YOUTUBE_API_KEY } from '../config';

const convertYoutubeResults = (data:any) : YoutubeSearchResult[] => {
  if (!data || !data.items || data.items.length === 0) { return []; }
  const results : YoutubeSearchResult[] = data.items.map((item:any) => {
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

export const searchVideos = async (query:string)
: Promise<YoutubeSearchResult[] | void> => {
  const baseUrl = 'https://youtube.googleapis.com/youtube/v3/search';
  const url = `${baseUrl}`
  + '?part=snippet'
  + '&type=video'
  + `&q=${encodeURI(query)} `
  + '&maxResults=3'
  + '&order=viewCount'
  + `&key=${YOUTUBE_API_KEY}`;

  // return sampleReleaseGroups;
  return convertYoutubeResults(sampleYoutubeResults);
  return axios.get(url)
    .then((res) => convertYoutubeResults(res.data))
    .catch((e) => {
      logError(e);
      logError(`youtube search error: ${url}`);
    });
};

export default {};

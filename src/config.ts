// eslint-disable-next-line @typescript-eslint/no-unused-expressions
require('dotenv').config({ path: './.env' });

const { MUSIXMATCH_API_KEY } = process.env;
const { GENIUS_API_KEY } = process.env;
const { YOUTUBE_API_KEY } = process.env;

export {
  MUSIXMATCH_API_KEY,
  GENIUS_API_KEY,
  YOUTUBE_API_KEY,
};

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
require('dotenv').config({ path: './.env' });

const { MUSIXMATCH_API_KEY } = process.env;

export {
  // eslint-disable-next-line import/prefer-default-export
  MUSIXMATCH_API_KEY,
};

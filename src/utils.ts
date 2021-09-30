/* eslint-disable arrow-body-style */
export const sortBy = (array: Array<any>, field: string, direction: string = 'asc'): Array<any> => {
  return array.sort((a, b) => {
    if (a[field] > b[field]) return (direction === 'asc' ? 1 : -1);
    if (a[field] < b[field]) return (direction === 'asc' ? -1 : 1);
    return 0;
  });
};

export const wait = (milliseconds:number) : Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getBaseArtist = (artist:string) : string => {
  let baseArtist = artist;
  if (artist.includes('feat.')) { baseArtist = artist.substring(0, baseArtist.indexOf('feat.')).trim(); }
  return baseArtist;
};

export const getBaseAlbum = (album:string) : string => {
  let baseAlbum = album;
  if (baseAlbum.includes('(')) { baseAlbum = baseAlbum.substring(0, baseAlbum.indexOf('(')).trim(); }
  if (baseAlbum.endsWith('- Single')) { baseAlbum = baseAlbum.substring(0, baseAlbum.indexOf('- Single')).trim(); }
  if (baseAlbum.endsWith('- Side A')) { baseAlbum = baseAlbum.substring(0, baseAlbum.indexOf('- Side A')).trim(); }
  if (baseAlbum.endsWith('- Side B')) { baseAlbum = baseAlbum.substring(0, baseAlbum.indexOf('- Side B')).trim(); }
  return baseAlbum;
};

export const logError = (errorMessage:any) => {
  console.log(errorMessage);
};

export const returnResponseSuccess = (
  res : any,
  payload?:any,
) => {
  return payload !== null
    ? res.status(200).json(payload)
    : res.status(200).end();
};

export const returnResponseError = (
  res : any,
  errroMessage:string,
) => {
  return res.status(500).json({
    error: errroMessage,
  });
};

export const returnBadRequest = (
  res : any,
  errroMessage:string,
) => {
  return res.status(404).json({
    error: errroMessage,
  });
};

export default {};

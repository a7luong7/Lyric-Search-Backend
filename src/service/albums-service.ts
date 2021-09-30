import axios from 'axios';
import { sampleAlbumArt, sampleReleases, sampleReleaseGroups } from '../data';
import {
  MusicBrainsCoverArtRes, MusicBrainsReleaseGroupRes, MusicBrainsReleasesRes, Song, Release,
} from '../types';
import {
  sortBy, getBaseArtist, getBaseAlbum, logError,
} from '../utils';

export const searchReleaseGroup = async (title:string, artist:string)
: Promise<MusicBrainsReleaseGroupRes> => {
  const limit = 1;
  const baseUrl = 'https://musicbrainz.org/ws/2/release-group';
  const url = `${baseUrl}`
  + `?query=release:${encodeURI(title)} `
  + `AND artist:${encodeURI(artist)}`
  + `&limit=${limit}`
  + '&fmt=json';

  return sampleReleaseGroups;
  return axios.get(url)
    .then((res) => res.data)
    .catch((e) => {
      logError(e);
      logError(`release group error ${url}`);
    });
};

export const getReleaseGroupAlbums = async (id:string)
: Promise<MusicBrainsReleasesRes> => {
  const baseUrl = 'https://musicbrainz.org/ws/2/release';
  const url = `${baseUrl}/?release-group=${id}&fmt=json`;

  return sampleReleases;
  return axios.get(url)
    .then((res) => res.data.releases)
    .catch((e) => {
      logError(e);
      logError(`release group albums error ${url}`);
    });
};

export const searchReleaseCoverArt = async (id:string) : Promise<MusicBrainsCoverArtRes> => {
  const url = `http://coverartarchive.org/release/${id}-250`;
  return sampleAlbumArt;
  return axios.get(url)
    .then((res) => res.data)
    .catch((e) => {
      logError(e);
      logError(`get cover art error ${url}`);
    });
};

export const getReleaseFromSong = async (song:Song)
: Promise<Release | null> => {
  try {
    const artist = getBaseArtist(song.artist_name);
    const albumTitle = getBaseAlbum(song.album_name);

    const releaseGroupRes = await searchReleaseGroup(albumTitle, artist);
    if (releaseGroupRes.count === 0 || !releaseGroupRes['release-groups']) { return null; }

    const releaseGroupsFiltered = releaseGroupRes['release-groups'].filter((x) => x.score > 90);
    const releaseGroupsSorted = sortBy(releaseGroupsFiltered, 'count');

    const releaseGroup = releaseGroupsSorted[0];
    if (releaseGroup['primary-type'] !== 'Album' && releaseGroup['primary-type'] !== 'Single') { return null; }

    const releasesRes = await getReleaseGroupAlbums(releaseGroup.id);
    if (releasesRes['release-count'] === 0) { return null; }

    const releasesWithArt = releasesRes.releases.filter((x) => x['cover-art-archive'].count > 0);
    const releaseWithArt = releasesWithArt[0];
    if (releasesWithArt.length > 0) {
      releaseWithArt.album_coverart = `http://coverartarchive.org/release/${releaseWithArt.id}/front`;
    }

    return releaseWithArt;
  } catch (e) {
    logError(e);
    return null;
  }
};

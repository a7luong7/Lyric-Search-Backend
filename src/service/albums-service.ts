import axios from 'axios';
import {
  sampleAlbumArt, sampleAlbums, sampleReleases, sampleReleaseGroups,
} from '../data';
import {
  AlbumRes, AlbumArtRes, AlbumReleases, Song, Album, MusicBrainsReleaseGroupRes,
  MusicBrainsReleasesRes, Release,
} from '../types';

export const searchReleaseGroup = async (title:string, artist:string)
: Promise<MusicBrainsReleaseGroupRes> => {
  const limit = 1;
  const baseUrl = 'https://musicbrainz.org/ws/2/release-group';
  const url = `${baseUrl}?query=release:${encodeURI(title)} AND artist:${encodeURI(artist)}&limit=${limit}&fmt=json`;

  return sampleReleaseGroups;
  return axios.get(url)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      console.log('release group error', url);
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
      console.log(e);
      console.log('release group albums error', url);
    });
};

export const searchAlbumArt = async (id:string) : Promise<AlbumArtRes> => {
  const url = `http://coverartarchive.org/release/${id}-250`;
  // return sampleAlbumArt;
  return axios.get(url).then((res) => res.data);
};

export const getAlbumFromSong = async (song:Song)
: Promise<Release | null> => {
  try {
    let artist = song.artist_name;
    let albumTitle = song.album_name;
    if (artist.includes('feat.')) { artist = artist.substring(0, artist.indexOf('feat.')).trim(); }
    if (albumTitle.includes('(')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('(')).trim(); }
    if (albumTitle.endsWith('- Single')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('- Single')).trim(); }
    if (albumTitle.endsWith('- Side A')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('- Side A')).trim(); }
    if (albumTitle.endsWith('- Side B')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('- Side B')).trim(); }

    const releaseGroupRes = await searchReleaseGroup(albumTitle, artist);
    if (releaseGroupRes.count === 0 || !releaseGroupRes['release-groups']) { return null; }

    const releaseGroupsFiltered = releaseGroupRes['release-groups']
      .filter((x) => x.score > 90)
      .sort((a, b) => {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        return 0;
      });

    const releaseGroup = releaseGroupsFiltered[0];
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
    return null;
  }
};

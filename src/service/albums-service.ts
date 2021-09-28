import axios from 'axios';
import { sampleAlbumArt, sampleAlbums } from '../data';
import {
  AlbumRes, AlbumArtRes, AlbumReleases, Song, Album,
} from '../types';

export const searchReleaseGroup = async (title:string, artist:string) : Promise<AlbumRes> => {
  const limit = 10;
  const primaryType = 'album';
  const baseUrl = 'https://musicbrainz.org/ws/2/release-group';
  const url = `${baseUrl}?query=release:${encodeURI(title)} AND artist:${encodeURI(artist)}&limit=${limit}&fmt=json`;

  // console.log('album search url', url);
  // return sampleAlbums;
  return axios.get(url).then((res) => res.data)
    .catch((e) => {
      console.log(e);
      console.log('release group error', url);
    });
};

export const getReleaseGroupAlbums = async (id:string) : Promise<Album[]> => {
  const baseUrl = 'https://musicbrainz.org/ws/2/release';
  const url = `${baseUrl}/?release-group=${id}&fmt=json`;
  return axios.get(url).then((res) => res.data.releases)
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

export const getAlbumFromSong = async (song:Song) => {
  try {
    let artist = song.track.artist_name;
    let albumTitle = song.track.album_name;
    if (artist.includes('feat.')) { artist = artist.substring(0, artist.indexOf('feat.')).trim(); }
    if (albumTitle.includes('(')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('(')).trim(); }
    if (albumTitle.endsWith('- Single')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('- Single')).trim(); }
    if (albumTitle.endsWith('- Side A')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('- Side A')).trim(); }
    if (albumTitle.endsWith('- Side B')) { albumTitle = albumTitle.substring(0, albumTitle.indexOf('- Side B')).trim(); }

    const releaseGroupRes = await searchReleaseGroup(albumTitle, artist);
    if (releaseGroupRes.count === 0 || !releaseGroupRes['release-groups']) {
      console.log('no release groups found for', albumTitle);
      return null;
    }
    const releaseGroupsFiltered = releaseGroupRes['release-groups']
      .filter((x) => x.score > 90)
      .sort((a, b) => {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        return 0;
      });
    // console.log('release groups', releaseGroupsFiltered);
    const releaseGroup = releaseGroupsFiltered[0];
    if (releaseGroup['primary-type'] !== 'Album' && releaseGroup['primary-type'] !== 'Single') { return null; }
    console.log(`release group for ${albumTitle} primary type`, releaseGroup['primary-type']);

    const albumsRes = await getReleaseGroupAlbums(releaseGroup.id);
    if (albumsRes.length === 0) {
      console.log('no albums found for', albumTitle);
      return null;
    }
    // console.log('found albums for', albumTitle);
    // console.log('album res', albumsRes);
    // console.log('album res', albumsRes);

    const albumsWithArt = albumsRes.filter((x) => x['cover-art-archive'].count > 0);
    if (artist === 'UPSAHL') {
      console.log('UPSAHL', albumsRes);
      console.log('albums with art counts is', albumsWithArt.length);
    }

    if (albumsWithArt.length > 0) {
      const albumWithArt = albumsWithArt[0];
      albumWithArt.album_coverart = `http://coverartarchive.org/release/${albumWithArt.id}/front`;
      return albumWithArt;
    }

    console.log(`no images found for album id: ${albumsRes[0].id} release id:${releaseGroup.id}`);

    return albumsRes[0];

    // album.album_coverart = `http://coverartarchive.org/release/${album.id}/front`;

    // const albumArtRes = await searchAlbumArt(album.id as string);
    // if (albumArtRes.images.length !== 0) {
    //   album.album_coverart = albumArtRes.images[0].thumbnails.small;
    // }
    // return album;
  } catch (e) {
    // console.log('error', e);
    return null;
  }
};

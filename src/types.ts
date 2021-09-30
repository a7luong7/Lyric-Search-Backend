export interface MusicBrainsReleaseGroupRes {
  created: string,
  count: number,
  offset: number,
  'release-groups': ReleaseGroup[]
}

export interface ReleaseGroup {
  id: string,
  score: number,
  count: number,
  title: string,
  'first-release-date': string,
  'primary-type': string,
  'artist-credit': ReleaseGroupArtistCredit[],
  releases: ReleaseGroupRelease[]
}

interface ReleaseGroupArtistCredit {
  name: string,
  artist: {
    id: string,
    name: string
  }
}

interface ReleaseGroupRelease {
  id: string,
  'status-id': string,
  title: string,
  status: string
}

export interface MusicBrainsReleasesRes {
  'release-count': number,
  'release-offset': number,
  releases: Release[]
}

export interface Release {
  id: string,
  date: string,
  title: string,
  status: string,
  'cover-art-archive': ReleaseCoverArtArchive,
  'album_coverart'? : string
}

interface ReleaseCoverArtArchive {
  count: number,
  front: boolean,
  back: boolean,
  artwork: boolean
}

export interface Song {
  track_id: number,
  track_name: string,
  track_rating: number,
  album_id: number,
  album_name: string,
  album_coverart?: string,
  artist_name: string
}

export interface MusixMatchTrackSearchRes {
  message: {
    body: {
      track_list: MusixMatchTrack[]
    }
  }
}

export interface MusixMatchTrack {
  track: Song
}

export interface AlbumRes {
  count: number,
  offset: number,
  releases?: Album[],
  'release-groups'?: Album[]
}

interface AlbumTag {
  count: number,
  name: string
}

export interface Album {
  id: string,
  title: string,
  date: string,
  score: number,
  count: number,
  'primary-type'?: string,
  'packaging-id'?: string,
  'release-group': AlbumReleaseGroup,
  'cover-art-archive': AlbumCoverArtArchive,
  tags?: AlbumTag[],
  album_coverart?: string
}

export interface AlbumReleases {
  'release-count': number,
  'release-offset': number,
  'releases': Album[]
}

export interface AlbumCoverArtArchive {
  count: number,
  back: boolean,
  front: boolean,
  artwork: boolean,
}

export interface AlbumReleaseGroup {
  'primary-type': string,
  'secondary-type': string
}

export interface AlbumArtRes {
  release:string,
  images: AlbumArtImage[]
}

interface AlbumArtImage {
  image:string,
  thumbnails: {
    large: string,
    small: string
  }
}

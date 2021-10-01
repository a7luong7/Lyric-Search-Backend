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

interface MusixMatchTrack {
  track: Song
}

export interface MusicBrainsCoverArtRes {
  release:string,
  images: MusicBrainsCoverArtImage[]
}

interface MusicBrainsCoverArtImage {
  image:string,
  thumbnails: {
    large: string,
    small: string
  }
}

export interface MusixMatchLyricsRes {
  message: {
    body: {
      lyrics: Lyrics
    }
  }
}

export interface Lyrics {
  lyrics_id: number,
  explicit: number,
  lyrics_body: string,
  script_tracking_url: string,
  pixel_tracking_url: string,
  lyrics_copyright: string,
  updated_time: string
}

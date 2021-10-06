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

export interface SongSearchResponse {
  songs: SongWithLyricsHighlight[],
  nextPage: number | null
}

export interface Song {
  id: number,
  api_path: string,
  path: string,
  full_title: string,
  title: string,
  title_with_featured: string,
  artist: string,
  lyrics_state: string,
  lyrics_owner_id?: number,
  song_art_image_url?: string,
  song_art_image_thumbnail_url?: string,
  header_image_url?: string,
  header_image_thumbnail_url?: string,
}

export interface LyricsHighlight {
  property: string,
  value: string,
  snippet: boolean,
  ranges: [{
    start: number,
    end: number
  }]
}

export interface SongWithLyricsHighlight extends Song{
  highlights?: LyricsHighlight[]
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

export interface YoutubeSearchResult {
  videoID: string,
  channelID: string,
  title: string,
  description: string,
  publishedAt: string,
  thumbnails: {
    default: string,
    medium: string,
    high: string
  }
}

// export interface GeniusLyricSearchRes {
//   meta: {
//     status: number
//   },
//   response: {
//     sections: GeniusLyricSearchSection[],
//     next_page: number | null
//   }
// }

// export interface GeniusLyricSearchSection {
//   type: string,
//   hits: LyricSearchHits[]
// }

// export interface LyricSearchHits {
//   type: string,
//   index: string,
//   highlights: LyricSearchHighlight[]
// }

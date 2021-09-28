// export interface SongLookupRes {
//   message: {
//     body: {
//       track_list: Song[]
//     }
//   }
// }

export interface SongLookupRes {
  track_list: Song[]
}

export interface Song {
  track: {
    track_id: number,
    track_name: string,
    album_id: number,
    album_name: string,
    album_coverart?: string,
    artist_name: string
  }
}

export interface AlbumRes {
  count: number,
  offset: number,
  releases?: Album[]
}

interface AlbumTag {
  count: number,
  name: string
}

export interface Album {
  id: string,
  title: string,
  date: string,
  'packaging-id'?: string,
  'release-group': AlbumReleaseGroup,
  tags?: AlbumTag[],
  album_coverart?: string
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

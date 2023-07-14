import { Dispatch, FormEvent, SetStateAction } from 'react'

export interface SearchProps {
  onSubmit: (event: FormEvent) => Promise<void>
}

export interface ChannelProps {
  apiKey?: string
  channel?: YouTubeChannel
  setChannel: Dispatch<SetStateAction<YouTubeChannel | undefined>>
}

export interface YouTubeChannel {
  id: string
  snippet: { title: string; thumbnails: { default: { url: string } } }
  statistics: {
    viewCount: string
    subscriberCount: string
    videoCount: string
  }
  playlists: YouTubePlaylist[]
  nextPageToken?: string
}

export interface YouTubePlaylist {
  id: string
  snippet: { title: string; thumbnails: { default: { url: string } } }
}

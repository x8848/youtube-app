'use client'

import { HTTP_STATUS_OK, MAX_PLAYLISTS_COUNT } from '@/utils'
import { YouTubeApiUrl } from '@/utils/enums'
import { YouTubeChannel } from '@/utils/types'
import { FormEvent, useState } from 'react'
import Channel from './components/Channel'
import Search from './components/Search'

// NOTE: Test App is MVP & doesn't handle API loading, error, cache etc.

const Home = () => {
  const [apiKey, setApiKey] = useState<string>()
  const [channel, setChannel] = useState<YouTubeChannel>()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (channel) {
      setApiKey(undefined)
      setChannel(undefined)
    }
    const formData = new FormData(event.target as HTMLFormElement)
    const formProps = Object.fromEntries(formData) as { key: string; forUsername: string }
    const urlParams = new URLSearchParams({ ...formProps, part: 'snippet,contentDetails,statistics' })
    const response = await fetch(YouTubeApiUrl.Channels + '?' + urlParams)
    if (response.status === HTTP_STATUS_OK) {
      const data = await response.json()
      if (data?.pageInfo?.totalResults == 1) {
        const channel = data.items[0]
        const urlParams = new URLSearchParams({
          key: formProps.key,
          channelId: channel.id,
          maxResults: MAX_PLAYLISTS_COUNT,
          part: 'snippet,contentDetails',
        })
        const response = await fetch(YouTubeApiUrl.Playlists + '?' + urlParams)
        if (response.status === HTTP_STATUS_OK) {
          const data = await response.json()
          setApiKey(formProps.key)
          setChannel({ ...channel, playlists: data?.items || [], nextPageToken: data.nextPageToken })
        }
      }
    }
  }

  return (
    <main className='p-9 max-w-xl mx-auto'>
      <Search onSubmit={onSubmit} />
      <Channel channel={channel} setChannel={setChannel} apiKey={apiKey} />
    </main>
  )
}

export default Home

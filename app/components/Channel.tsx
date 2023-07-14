import { MAX_PLAYLISTS_COUNT, YOUTUBE_API_URL } from '@/utils'
import { ChannelProps } from '@/utils/types'
import { FC } from 'react'

const Channel: FC<ChannelProps> = ({ channel, apiKey, setChannel }) => {
  if (!channel) return null

  const loadMore = async () => {
    if (apiKey && channel && channel.nextPageToken) {
      const urlParams = new URLSearchParams({
        key: apiKey,
        channelId: channel.id,
        maxResults: MAX_PLAYLISTS_COUNT,
        pageToken: channel.nextPageToken,
        part: 'snippet,contentDetails',
      })
      const response = await fetch(YOUTUBE_API_URL + '/playlists?' + urlParams)
      if (response.status === 200) {
        const data = await response.json()
        const playlists = data?.items || []
        setChannel({ ...channel, playlists: [...channel.playlists, ...playlists], nextPageToken: data.nextPageToken })
      }
    }
  }

  return (
    <>
      <div className='my-10 border p-5'>
        <div className='text-center font-bold'>{channel.snippet.title}</div>
        <img className='mx-auto my-5' src={channel.snippet.thumbnails.default.url} />
        <div className='w-fit mx-auto'>
          <div>
            <label className='font-medium'>Subscribers: </label>
            {channel.statistics.subscriberCount}
          </div>
          <div>
            <label className='font-medium'>Videos: </label>
            {channel.statistics.videoCount}
          </div>
          <div>
            <label className='font-medium'>Views: </label>
            {channel.statistics.viewCount}
          </div>
        </div>
      </div>
      {channel.playlists.map((playlist) => (
        <div className='flex justify-between items-center my-2 bg-slate-100' key={playlist.id}>
          <div className='p-5 text-left'>{playlist.snippet.title}</div>
          <img src={playlist.snippet.thumbnails?.default?.url} />
        </div>
      ))}
      {apiKey && channel.nextPageToken && (
        <div className='mt-5 text-center '>
          <button onClick={loadMore}>LOAD MORE</button>
        </div>
      )}
    </>
  )
}

export default Channel

import { SearchProps } from '@/utils/types'
import { FC } from 'react'

const Search: FC<SearchProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col'>
      <label className='pb-2'>YOUTUBE_API_KEY</label>
      <input name='key' required />
      <br />
      <label className='pb-2'>FOR_USERNAME</label>
      <input name='forUsername' required />
      <br />
      <button>NEXT</button>
    </form>
  )
}

export default Search

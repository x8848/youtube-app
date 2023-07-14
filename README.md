# YouTubeApp

## Development

- `yarn dev` - start development server

## Build

- `yarn build` - make production build

## Start

- `yarn start` - start production server

## Docker

- `yarn docker:image` - create Docker image `youtube-app`
- `yarn docker:start` - start Docker image `youtube-app` container
- `yarn docker:stop` - stop all Docker containers

## Technical Task

Create simple web app to fetch public youtube channel data (css styling doesn't matter).

1. Create NodeJS/TS application (bare or any nodejs framework based) running in Docker container and behave like an api proxy between user browser and youtube.
2. Running Docker image exposing any port - which when open as web interface - looks as a page with TWO html input fields (one for YOUTUBE_API_KEY, second for youtube "forUsername" ) and html button "Next"
3. Register own YOUTUBE_API_KEY for test - it's free for everyone who have google account (do not expose it to result NodeJS app): https://console.cloud.google.com/apis/credentials
   (help: https://support.google.com/googleapi/answer/6158862?hl=en&ref_topic=7013279), then enable youtube v3 api: https://console.cloud.google.com/apis/library/youtube.googleapis.com
4. Filling html input field YOUTUBE_API_KEY with registered api key (in step 3), and html input field FOR_USERNAME (for test as "GoogleDevelopers" public youtube channel, but could be any public) and pressing "Next" button - display on a page fetched channel info stats + avatar img (css stylings deoesn't metter)
   https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=[FOR_USERNAME]&key=[YOUTUBE_API_KEY]
   // + Extended/Advanced option:
5. Getting "id" of first channel from previous response (if exists) - make a infinte scroll or just paged load of channel playlist items
   ( https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=[CHANNEL_ID]&maxResults=25&key=[YOUTUBE_API_KEY] )

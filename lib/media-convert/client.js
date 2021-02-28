import MediaConvert from '@aws-sdk/client-mediaconvert';
const { MediaConvertClient } = MediaConvert;

const CLIENT_SETTINGS = {
  endpoint: process.env.CTO_MEDIACONVERT_ENDPOINT
};

// Note: for this to work, we need to preload env vars
// See https: //github.com/motdotla/dotenv#preload
const client = new MediaConvertClient(CLIENT_SETTINGS);

export default client;

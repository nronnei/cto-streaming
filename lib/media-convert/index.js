import MediaConvert from '@aws-sdk/client-mediaconvert';
const { MediaConvertClient, ListJobTemplatesCommand } = MediaConvert;

// Note: for this to work, we need to preload env vars
// See https: //github.com/motdotla/dotenv#preload
const client = new MediaConvertClient({
  endpoint: process.env.CTO_MEDIACONVERT_ENDPOINT
});

export default async function listTemplates() {
  try {
    const listTemplatesCommand = new ListJobTemplatesCommand({});
    const res = await client.send(listTemplatesCommand);
    res.JobTemplates.forEach(t => console.log(t.Name));
  } catch (error) {
    console.error(error);
  }
}

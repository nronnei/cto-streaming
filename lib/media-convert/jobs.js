import { _handleError } from '../util.js';
import client from './client.js';
import MediaConvert from '@aws-sdk/client-mediaconvert';
const { CreateJobCommand } = MediaConvert;

const DOCUMENTARY_SOURCE_URI = 's3://changetheoutcome/documentary/source/v12.mp4';

export async function createJob(params) {
  const ERR_TAG = '[createJob]';
  try {
    console.log('params', params);
    const jobCommand = new CreateJobCommand(params);
    const res = await client.send(jobCommand);
    return res;
  } catch (error) {
    _handleError(ERR_TAG, error);
  }
}

export function createDocumentaryJob(template) {
  return createJob({
    Role: process.env.CTO_ROLE_ARN,
    JobTemplate: template.Name,
    Settings: {
      Inputs: [ { FileInput: DOCUMENTARY_SOURCE_URI } ]
    }
  });
}

export default {
  createDocumentaryJob,
  createJob,
}

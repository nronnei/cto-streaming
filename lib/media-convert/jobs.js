import { _handleError } from '../util.js';
import client from './client.js';
import MediaConvert from '@aws-sdk/client-mediaconvert';
const { CreateJobCommand } = MediaConvert;

const { DOCUMENTARY_SOURCE_URI, LOG_LEVEL } = process.env;

function shouldLogInfo() {
  return ['INFO', 'VERBOSE', 'DEBUG', 'ALL'].includes(LOG_LEVEL.toUpperCase());
}

export async function createJob(params) {
  const ERR_TAG = '[createJob]';
  try {
    console.info(`${ERR_TAG} Creating a new job. ${shouldLogInfo() ? JSON.stringify(params) : ''}`);
    const jobCommand = new CreateJobCommand(params);
    const res = await client.send(jobCommand);
    return res;
  } catch (error) {
    _handleError(ERR_TAG, error);
  }
}

export function createDocumentaryJob(template, version='none', isProduction=false) {
  return createJob({
    Role: process.env.CTO_ROLE_ARN,
    JobTemplate: template.Name,
    Settings: {
      Inputs: [ { FileInput: DOCUMENTARY_SOURCE_URI } ]
    },
    Tags: {
      version,
      current: isProduction
    },
  });
}

export default {
  createDocumentaryJob,
  createJob,
}

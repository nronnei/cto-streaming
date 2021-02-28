import { CTO_DOCUMENTARY_VERSION } from '../../constants.js';
import { _handleError } from '../util.js';
import client from './client.js';
import MediaConvert from '@aws-sdk/client-mediaconvert';
const { ListJobTemplatesCommand, CreateJobTemplateCommand } = MediaConvert;

/**
 * Builds the destination URL to attach to an OutputGroup.
 * @param {boolean} [incrementVersion=false] Whether or not to increment the documentary version.
 * @returns {string} The S3 URL for the destination.
 */
function buildDestinationURL(incrementVersion) {
  const version = incrementVersion ? CTO_DOCUMENTARY_VERSION : CTO_DOCUMENTARY_VERSION + 1
  return `s3://changetheoutcome/documentary/stream/v${version}/ChangeTheOutcome`
}

/**
 * Builds the name for a JobTemplate
 * @param {boolean} [incrementVersion=false] Whether or not to increment the documentary version.
 * @returns {string} The S3 URL for the destination.
 */
function buildTemplateName(incrementVersion = false) {
  const version = incrementVersion ? CTO_DOCUMENTARY_VERSION : CTO_DOCUMENTARY_VERSION + 1
  return `CTO Documentary Template (v${version})`
}

/**
 * Given a JobTemplate, clone it then update the name and destination using the documentary version.
 * @param {JobTemplate} template The JobTemplate to update
 * @returns {JobTemplate}
 */
export function upgradeTemplate(template) {
  try {
    const clone = JSON.parse(JSON.stringify(template));
    delete clone.Arn;
    delete clone.CreatedAt;
    delete clone.LastUpdated;
    clone.Settings.OutputGroups.forEach((og) => {
      og.OutputGroupSettings.HlsGroupSettings.Destination = buildDestinationURL(true);
    });
    clone.Name = buildTemplateName(true);
    return clone;
  } catch (error) {
    _handleError('upgradeTemplate', error);
  }
}

export async function createJobTemplate(template) {
  try {
    const createTemplateCmd = new CreateJobTemplateCommand(template);
    console.info('createTemplateCmd', createTemplateCmd);
    const res = await client.send(createTemplateCmd);
    return res.JobTemplate;
  } catch (error) {
    _handleError('createJobTemplate', error);
  }
}

/**
 * Gets the most recently created documentary template.
 * @returns {Promise<JobTemplate>}
 */
export async function getDocumentaryTemplate() {
  return await getMostRecentJobTemplate({ Category: 'documentary' });
}

/**
 * Gets the most recent MediaConvert Job Template from AWS.
 * @returns {JobTemplate}
 */
export async function getMostRecentJobTemplate(params) {
  try {
    const defaultParams = { ListBy: 'CREATION_DATE', Order: 'DESCENDING' };
    const templates = await listTemplates({ ...defaultParams, ...params });
    return templates[0];
  } catch (error) {
    _handleError('getMostRecentJobTemplate', error);
  }
}

/**
 * Gets existing AWS MediaConvert Job Templates
 * @param {*} params Optional parameters for the ListJobTemplates comment.
 *   @see {@link https://docs.aws.amazon.com/mediaconvert/latest/apireference/jobtemplates.html#jobtemplatesget|The API Reference}
 */
export async function listTemplates(params = {}) {
  try {
    const listTemplatesCommand = new ListJobTemplatesCommand(params);
    const res = await client.send(listTemplatesCommand);
    return res.JobTemplates;
  } catch (error) {
    _handleError('listTemplates', error);
  }
}

export default {
  createJobTemplate,
  getDocumentaryTemplate,
  getMostRecentJobTemplate,
  listTemplates,
  upgradeTemplate,
}

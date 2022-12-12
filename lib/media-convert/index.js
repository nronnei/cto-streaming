import { _handleError } from '../util.js';
import templates from './templates.js';
import jobs from './jobs.js';

const DRY_RUN = process.env.CTO_DRY_RUN;

export async function publishUpdatedTemplate() {
  const ERR_TAG = '[publishUpdatedTemplate]';
  try {
    const docTemplate = await templates.getDocumentaryTemplate();
    const updated = templates.upgradeTemplate(docTemplate);
    if (DRY_RUN === 'true') return updated;
    else return templates.createJobTemplate(updated);
  } catch (error) {
    _handleError(ERR_TAG, error);
  }
}

export async function publishDocumentaryJob(publishNewVersion=false) {
  const template = await (publishNewVersion
    ? publishUpdatedTemplate()
    : templates.getDocumentaryTemplate());
  if (DRY_RUN === 'true') return console.info(JSON.stringify(template, null, 3));
  else return jobs.createDocumentaryJob(template);
}

export default {
  publishDocumentaryJob,
  publishUpdatedTemplate,
}

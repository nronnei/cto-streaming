import { _handleError } from '../util.js';
import templates from './templates.js';
import jobs from './jobs.js';

export async function publishUpdatedTemplate() {
  const ERR_TAG = '[publishUpdatedTemplate]';
  try {
    const docTemplate = await templates.getDocumentaryTemplate();
    const updated = templates.upgradeTemplate(docTemplate);
    // this assignment only simplifies return statement
    let template = updated;
    if (process.env.CTO_DRY_RUN === 'true') {
      console.info(template);
    } else {
      template = await templates.createJobTemplate(template);
    }
    return template;
  } catch (error) {
    _handleError(ERR_TAG, error);
  }
}

export async function publishDocumentaryJob(template) {
  if (!template) template = await templates.getDocumentaryTemplate();
  console.log(template)
  return jobs.createDocumentaryJob(template);
}

export default {
  publishDocumentaryJob,
  publishUpdatedTemplate,
}

import 'dotenv/config.js';
import conversion from './lib/media-convert/index.js';

// Prove it's working
(async () => {
  console.log('Publishing job');
  console.log('DRY RUN?', process.env.CTO_DRY_RUN)
  // Re-upload the current version
  const job = await conversion.publishDocumentaryJob();
  // Publish a new version/template
  // const job = await conversion.publishDocumentaryJob(true);
  console.log(job);
  process.exit(0);
})();

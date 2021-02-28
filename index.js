import conversion from './lib/media-convert/index.js';

// Prove it's working
(async () => {
  console.log('Publishing job');
  const job = await conversion.publishDocumentaryJob();
  console.log(job);
  process.exit(0);
})();

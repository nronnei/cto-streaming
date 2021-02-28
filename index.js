import conversion from './lib/media-convert/index.js';

// Prove it's working
(async () => {
  console.log('Creating new template');
  const newTemplate = await conversion.publishUpdatedTemplate();
  console.log(Object.keys(newTemplate));
  process.exit(0);
})();

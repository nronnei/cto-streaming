import lib from './lib/index.js';

// Prove it's working
(async () => {
  console.log(process.env.AWS_REGION);
  console.log(process.env.AWS_PROFILE);
  await lib.conversion();
  process.exit(0);
})();

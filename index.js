import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Prove it's working
console.log(process.env.AWS_PROFILE);

process.exit(0);

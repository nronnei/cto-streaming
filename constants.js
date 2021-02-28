/**
 * The "version prefix" for the documentary's output location in S3
 * @constant {string} CTO_DOCUMENTARY_VERSION
 */
export const CTO_DOCUMENTARY_VERSION = 'v12';

/**
 * The resolutions we want to convert to in MediaConvert
 * @constant {string[]} TARGET_RESOLUTIONS
 */
export const TARGET_RESOLUTIONS = [ '1080p', '720p' ];

export default {
  CTO_DOCUMENTARY_VERSION,
  TARGET_RESOLUTIONS,
};

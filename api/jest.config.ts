import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFiles: ["./tests/setEnvVars.js", './tests/bootstrap.ts'],
};
export default config;
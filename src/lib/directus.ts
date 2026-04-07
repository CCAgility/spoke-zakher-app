import { createDirectus, rest, staticToken } from '@directus/sdk';

// SRE Protocol: Zero-Trust Singleton Pattern
const directus = createDirectus(process.env.DIRECTUS_URL || 'http://localhost')
  .with(staticToken(process.env.DIRECTUS_STATIC_TOKEN || 'build-time-token'))
  .with(rest());


export default directus;

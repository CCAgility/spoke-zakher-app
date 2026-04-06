import { createDirectus, rest, staticToken } from '@directus/sdk';

// SRE Protocol: Zero-Trust Singleton Pattern
const directus = createDirectus(process.env.DIRECTUS_URL!)
  .with(staticToken(process.env.ADMIN_TOKEN!))
  .with(rest());

export default directus;

import { createDirectus, rest, staticToken } from '@directus/sdk';

/**
 * SRE Protocol: Zero-Trust Singleton Pattern
 * 
 * Token is only mounted when a real env var exists.
 * During CI/build-time (NEXT_PHASE=phase-production-build), 
 * the client initializes without auth — page fetchers catch
 * the resulting errors via the Zero-Throw Protocol.
 */
const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.CMS_URL || 'http://localhost';
const STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN || process.env.DIRECTUS_ADMIN_TOKEN || '';

const client = createDirectus(DIRECTUS_URL).with(rest());
const directus = STATIC_TOKEN ? client.with(staticToken(STATIC_TOKEN)) : client;

export { DIRECTUS_URL };
export default directus;

// extensions/hooks/schema-switcher/index.js
// D-1 Schema Isolation — Directus search_path Hook
// Locks Directus to the tenant-specific PostgreSQL schema on server startup.
// See: docs/wiki/flash-plans/d1-unified-schema-isolation.md Step 3.1

module.exports = function registerHook({ action }, { database, env }) {
  const tenantId = env.TENANT_ID;  // Injected via Cloud Run env var
  const schemaRegex = /^[a-z0-9_-]+$/;

  if (!tenantId || !schemaRegex.test(tenantId)) {
    throw new Error(`CRITICAL: Missing or invalid TENANT_ID: ${tenantId}`);
  }

  action('server.startup', async () => {
    await database.raw('SET search_path TO ??, public;', [`tenant_${tenantId}`]);
    await database.raw('SET ROLE ??;', [`role_${tenantId}`]);
    console.log(`[Schema-Switcher] Locked to schema: tenant_${tenantId}`);
  });
};

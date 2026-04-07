const url = "https://directus-cms-159885988938.us-central1.run.app";
const token = "q5KlYjzctH1wkDi82vb7A4FsQL6ZTWgd";

async function request(endpoint, method, body = null) {
  const res = await fetch(`${url}${endpoint}`, {
    method,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if (!res.ok) {
    if (data.errors && data.errors[0].extensions?.code === 'RECORD_NOT_UNIQUE') {
      console.log(`[Skip] Already exists: ${endpoint}`);
      return data;
    }
    if (data.errors && data.errors[0].extensions?.code === 'INVALID_PAYLOAD' && data.errors[0].message.includes('has to be unique')) {
       console.log(`[Skip] Already exists: ${endpoint}`);
       return data;
    }
    console.error(`Error on ${method} ${endpoint}:`, data.errors);
  } else {
    console.log(`Success: ${method} ${endpoint}`);
  }
  return data;
}

async function main() {
  console.log("Applying Schema Updates to Zakher Spoke...");

  // 1. Create redirects collection
  await request('/collections', 'POST', {
    collection: 'redirects',
    meta: {
      hidden: false,
      icon: 'redo',
      note: 'Self-Healing Redirect Shield',
      display_template: '{{old_slug}} → {{new_slug}}',
    },
    schema: { name: 'redirects' },
    fields: [
      {
        field: 'id',
        type: 'integer',
        meta: { hidden: true, readonly: true },
        schema: { is_primary_key: true, has_auto_increment: true }
      },
      {
        field: 'old_slug',
        type: 'string',
        meta: { required: true, interface: 'input' },
        schema: { is_nullable: false }
      },
      {
        field: 'new_slug',
        type: 'string',
        meta: { required: true, interface: 'input' },
        schema: { is_nullable: false }
      },
      {
        field: 'collection',
        type: 'string',
        meta: { interface: 'input', default_value: 'properties' },
        schema: { default_value: 'properties' }
      },
      {
        field: 'created_at',
        type: 'timestamp',
        meta: { special: ['date-created'], readonly: true }
      },
      {
        field: 'status_code',
        type: 'integer',
        meta: { interface: 'select-dropdown', options: { choices: [{text: '301 Permanent', value: 301}, {text: '302 Temporary', value: 302}] } },
        schema: { default_value: 301 }
      }
    ]
  });

  // 2. Add SEO Fields to site_config
  const siteConfigFields = [
    { field: 'ga_id', type: 'string', meta: { interface: 'input' } },
    { field: 'fb_pixel', type: 'string', meta: { interface: 'input' } },
    { field: 'default_meta_title', type: 'string', meta: { interface: 'input' } },
    { field: 'global_og_image', type: 'uuid', meta: { interface: 'file-image', special: ['file'] }, schema: { foreign_key_table: 'directus_files', foreign_key_column: 'id' } }
  ];

  for (const f of siteConfigFields) {
    await request('/fields/site_config', 'POST', f);
  }

  // 3. Add SEO Fields to properties
  const propertiesFields = [
    { field: 'seo_title', type: 'string', meta: { interface: 'input' } },
    { field: 'seo_description', type: 'text', meta: { interface: 'input-multiline' } },
    { field: 'canonical_url', type: 'string', meta: { interface: 'input' } },
    { field: 'slug_history', type: 'json', meta: { interface: 'input-code', special: ['cast-json'], hidden: true }, schema: { default_value: '[]' } }
  ];

  for (const f of propertiesFields) {
    await request('/fields/properties', 'POST', f);
  }

  console.log("Schema Update Complete!");
}

main();

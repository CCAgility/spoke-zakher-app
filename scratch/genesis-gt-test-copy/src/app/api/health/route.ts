import { NextResponse } from 'next/server';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

// Force dynamic evaluation so it actually hits the CMS at runtime (and during cloudbuild test), 
// rather than serving a cached build-time response.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Perform a lightweight poll. We use 'site_config' as it's a singleton and extremely fast.
    const config = await directus.request(readItems('site_config', { limit: 1 }));
    
    if (config) {
      return NextResponse.json({ 
        status: 'ok', 
        message: 'Platform & CMS fully operational',
        timestamp: new Date().toISOString()
      }, { status: 200 });
    }
    
    // Throw if data payload is corrupted
    throw new Error("CMS payload verification failed.");
    
  } catch (error: any) {
    console.error("Health Check Failed:", error.message);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Critical infrastructure failure or CMS unreachable.' 
    }, { status: 500 });
  }
}

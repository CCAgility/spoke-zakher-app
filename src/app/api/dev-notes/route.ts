import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const NOTES_FILE = path.join(process.cwd(), 'dev-notes.json');

export async function GET() {
  try {
    if (!fs.existsSync(NOTES_FILE)) {
      return NextResponse.json({});
    }
    const data = fs.readFileSync(NOTES_FILE, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read notes' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { url, note } = await req.json();
    let currentNotes: Record<string, string> = {};
    
    if (fs.existsSync(NOTES_FILE)) {
      currentNotes = JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8'));
    }
    
    currentNotes[url] = note;
    fs.writeFileSync(NOTES_FILE, JSON.stringify(currentNotes, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save note' }, { status: 500 });
  }
}

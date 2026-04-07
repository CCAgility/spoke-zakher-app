'use client';

import React, { useState, useEffect } from 'react';

const LEGACY_URLS = [
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0389-mp8WRqw9M5T49WDb.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0398-m7V3a5Gq50IoWDoN.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0416-AE0PJaGLJKikzKEo.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0430-AVL7R1jyNyFoWb4O.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0648-AQExgDanpDUpa2Kz.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0667-mxB4RMNwkBc51ekz.jpeg"
];

const LOCAL_URLS = Array.from({ length: 9 }, (_, i) => `/gallery/casa-estrella/img-0${i + 1}.webp`);

export default function PhotosAdmin() {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/dev-notes').then(r => r.json()).then(data => setNotes(data));
  }, []);

  const saveNote = async (url: string) => {
    setSaving(prev => ({ ...prev, [url]: true }));
    try {
      await fetch('/api/dev-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, note: notes[url] }),
      });
    } finally {
      setTimeout(() => {
        setSaving(prev => ({ ...prev, [url]: false }));
      }, 500);
    }
  };

  const images = [...LEGACY_URLS, ...LOCAL_URLS];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans pb-32">
      <h1 className="text-3xl font-light mb-2">Dev Administration</h1>
      <p className="text-gray-500 mb-8">Internal tool for annotating and tagging photography assets.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100/50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-4 font-medium">Asset Preview</th>
              <th className="px-6 py-4 font-medium">Source / Filename</th>
              <th className="px-6 py-4 w-96 font-medium">Internal Notes & Tagging</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {images.map(url => (
              <tr key={url} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 align-top w-64">
                  <div className="relative h-32 w-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="Reference" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                  </div>
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="text-sm font-medium text-gray-800 break-all max-w-[400px]">
                    {url.split('/').pop()}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {url.includes('zyrosite') ? 'Legacy Zyrosite External' : 'Local TurboPack Asset'}
                  </div>
                </td>
                <td className="px-6 py-4 align-top group">
                  <div className="relative">
                    <textarea
                      placeholder="e.g. Master Bedroom, Needs Retouching..."
                      value={notes[url] || ''}
                      onChange={(e) => setNotes(prev => ({ ...prev, [url]: e.target.value }))}
                      onBlur={() => saveNote(url)}
                      className="w-full h-32 text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] resize-none transition-all"
                    />
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -bottom-8 right-0 text-xs text-green-600 font-medium tracking-wide">
                      {saving[url] ? 'Saving...' : 'Auto-saves on blur'}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

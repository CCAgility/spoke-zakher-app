'use client';

import React, { useState, useEffect } from 'react';

const LOCAL_URLS = [
  "/gallery/casa-estrella/1.webp",
  "/gallery/casa-estrella/5.webp",
  "/gallery/casa-estrella/6.webp",
  "/gallery/casa-estrella/9.webp",
  "/gallery/casa-estrella/casa-estrella-bedroom.webp",
  "/gallery/casa-estrella/casa-estrella-ext-dining-room.webp",
  "/gallery/casa-estrella/casa-estrella-double-room-1.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-2-1.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-2-2.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-2-3.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-2-4.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-2.jpg",
  "/gallery/casa-estrella/casa-estrella-double-room-3-1.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-3-2.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-3-3.jpg",
  "/gallery/casa-estrella/casa-estrella-double-room-3-4.jpg",
  "/gallery/casa-estrella/casa-estrella-double-room-3.jpg",
  "/gallery/casa-estrella/casa-estrella-double-room-4-1.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-4-2.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-4-3.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-4-4.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-4-5.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-4.jpg",
  "/gallery/casa-estrella/casa-estrella-double-room-5-1.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-5-2.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-5-3.jpeg",
  "/gallery/casa-estrella/casa-estrella-double-room-5-4.jpeg",
  "/gallery/casa-estrella/casa-estrella-junior-suite-1.jpeg",
  "/gallery/casa-estrella/casa-estrella-junior-suite-2.jpeg",
  "/gallery/casa-estrella/casa-estrella-junior-suite-3.jpeg",
  "/gallery/casa-estrella/casa-estrella-junior-suite-4.jpg",
  "/gallery/casa-estrella/casa-estrella-junior-suite-5.jpg",
  "/gallery/casa-estrella/casa-estrella-junior-suite-6.jpg",
  "/gallery/casa-estrella/casa-estrella-kitchen.webp",
  "/gallery/casa-estrella/casa-estrella-living-room-2.webp",
  "/gallery/casa-estrella/casa-estrella-living-room.webp",
  "/gallery/casa-estrella/casa-estrella-master-suite-1.jpeg",
  "/gallery/casa-estrella/casa-estrella-master-suite-2.jpeg",
  "/gallery/casa-estrella/casa-estrella-master-suite-3.jpeg",
  "/gallery/casa-estrella/casa-estrella-master-suite-4.jpeg",
  "/gallery/casa-estrella/casa-estrella-master-suite-5.jpeg",
  "/gallery/casa-estrella/casa-estrella-master-suite-6.jpg"
];

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

  const images = [...LOCAL_URLS];

  const stats = images.reduce((acc, url) => {
    let category = "Misc";
    if (url.includes('master-suite')) category = "Master Suite";
    else if (url.includes('junior-suite')) category = "Junior Suite";
    else if (url.includes('double-room-2')) category = "Double Room 2";
    else if (url.includes('double-room-3')) category = "Double Room 3";
    else if (url.includes('double-room-4')) category = "Double Room 4";
    else if (url.includes('double-room-5')) category = "Double Room 5";
    else if (url.includes('double-room')) category = "Double Room";
    else if (url.includes('living-room')) category = "Living Room";
    else if (url.includes('dining-room')) category = "Dining Room";
    else if (url.includes('kitchen')) category = "Kitchen";
    else if (url.includes('bedroom')) category = "Bedroom";
    else if (/\d+\.webp$/.test(url)) category = "Exterior / Hero";
    
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans pb-32">
      <div className="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 font-serif text-[#0f2e24]">Gallery Asset Dashboard</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-[#0f2e24] text-[#daae6a] p-6 rounded-xl flex-shrink-0 flex flex-col justify-center items-center h-full min-w-[200px]">
             <div className="text-5xl font-light mb-2">{images.length}</div>
             <div className="text-sm font-semibold uppercase tracking-wider">Total Assets</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
             {Object.entries(stats).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                <div key={cat} className="flex flex-col bg-gray-50 p-4 rounded-xl border border-gray-100 justify-center">
                   <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">{cat}</span>
                   <span className="text-2xl text-gray-900 font-light">{count}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

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

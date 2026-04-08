'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const PrototypeB = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-montserrat text-xs tracking-[0.2em] uppercase text-black mb-8 border-b pb-4">Module B: Blueprint Modal List</h3>
      <p className="font-montserrat text-sm text-gray-500 italic mb-4">A minimalist, deeply technical approach. (Drawers map to Option D's modal style when wired up).</p>

      <div className="flex flex-col border-t border-black/10">
        <div className="flex justify-between items-center py-6 border-b border-black/10 cursor-pointer hover:bg-gray-50 transition-colors px-4 group">
           <div>
               <h4 className="font-cormorant text-2xl mb-1">The Master Suite</h4>
               <p className="font-montserrat text-xs tracking-widest uppercase text-gray-400">King Bed &middot; Private Bath &middot; Balcony</p>
           </div>
           <div className="flex items-center gap-4">
               <span className="font-montserrat text-xs uppercase underline tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Specs</span>
               <ChevronRight className="text-gray-300 group-hover:text-black transition-colors" />
           </div>
        </div>

        <div className="flex justify-between items-center py-6 border-b border-black/10 cursor-pointer hover:bg-gray-50 transition-colors px-4 group">
           <div>
               <h4 className="font-cormorant text-2xl mb-1">Junior Suite</h4>
               <p className="font-montserrat text-xs tracking-widest uppercase text-gray-400">King Bed &middot; Private Bath</p>
           </div>
           <div className="flex items-center gap-4">
               <span className="font-montserrat text-xs uppercase underline tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Specs</span>
               <ChevronRight className="text-gray-300 group-hover:text-black transition-colors" />
           </div>
        </div>

        <div className="flex justify-between items-center py-6 border-b border-black/10 cursor-pointer hover:bg-gray-50 transition-colors px-4 group">
           <div>
               <h4 className="font-cormorant text-2xl mb-1">Guest Configurations</h4>
               <p className="font-montserrat text-xs tracking-widest uppercase text-gray-400">5 Double Rooms &middot; Shared Access</p>
           </div>
           <div className="flex items-center gap-4">
               <span className="font-montserrat text-xs uppercase underline tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Specs</span>
               <ChevronRight className="text-gray-300 group-hover:text-black transition-colors" />
           </div>
        </div>
      </div>
    </div>
  );
};

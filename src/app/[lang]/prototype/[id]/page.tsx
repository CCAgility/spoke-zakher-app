import React from 'react';
import { PrototypeA } from '@/components/prototypes/PrototypeA';
import { PrototypeB } from '@/components/prototypes/PrototypeB';
import { PrototypeC } from '@/components/prototypes/PrototypeC';
import { PrototypeD } from '@/components/prototypes/PrototypeD';
import Link from 'next/link';

export default function PrototypePage({ params }: { params: { lang: string, id: string } }) {
  const renderPrototype = () => {
    switch(params.id?.toLowerCase()) {
      case 'a': return <PrototypeA />;
      case 'b': return <PrototypeB />;
      case 'c': return <PrototypeC />;
      case 'd': return <PrototypeD />;
      default: return <div>Prototype not found. Try /a, /b, /c, /d</div>;
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 font-montserrat">
      <div className="max-w-[1400px] mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-8 border-b border-black/10">
            <div>
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2 block">Casa Estrella de San Pedro</span>
                <h1 className="font-cormorant text-4xl">Room Layout Sandbox</h1>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
                <Link href={`/${params.lang}/prototype/a`} className={`px-4 py-2 text-xs uppercase tracking-widest ${params.id === 'a' ? 'bg-black text-white' : 'border border-black/20 hover:border-black'}`}>A: Parallax</Link>
                <Link href={`/${params.lang}/prototype/b`} className={`px-4 py-2 text-xs uppercase tracking-widest ${params.id === 'b' ? 'bg-black text-white' : 'border border-black/20 hover:border-black'}`}>B: Blueprint</Link>
                <Link href={`/${params.lang}/prototype/c`} className={`px-4 py-2 text-xs uppercase tracking-widest ${params.id === 'c' ? 'bg-black text-white' : 'border border-black/20 hover:border-black'}`}>C: Lookbook</Link>
                <Link href={`/${params.lang}/prototype/d`} className={`px-4 py-2 text-xs uppercase tracking-widest ${params.id === 'd' ? 'bg-black text-white' : 'border border-black/20 hover:border-black'}`}>D: Bento Grid</Link>
            </div>
        </div>

        {renderPrototype()}
      </div>
    </main>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-6 selection:bg-[#8BA3A0] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}} />
      
      <div className="max-w-2xl text-center flex flex-col items-center">
        <span className="font-montserrat text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 mb-6 block">
          404 Sanctuary Not Found
        </span>
        <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-tight mb-8">
          The Path is Hidden
        </h1>
        <p className="font-montserrat text-sm md:text-base font-light text-white/80 leading-relaxed max-w-lg mb-12">
          The estate or feature you are looking for is currently unavailable or has been relocated.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="/"
            className="border border-white/60 hover:bg-white hover:text-black px-10 py-4 font-montserrat text-xs tracking-[0.2em] uppercase transition-all duration-300 active:scale-95"
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

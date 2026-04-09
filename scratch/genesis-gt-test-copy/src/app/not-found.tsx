import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 selection:bg-gray-700">
      <div className="max-w-2xl text-center flex flex-col items-center font-sans">
        <span className="text-xs tracking-[0.3em] uppercase text-white/50 mb-6 block">
          404 Exception
        </span>
        <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
          Resource Not Found
        </h1>
        <p className="text-sm md:text-base font-light text-white/80 leading-relaxed max-w-lg mb-12">
          The requested page could not be located. It may have been moved or the CMS path is incorrect.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link 
            href="/" 
            className="border border-white/60 hover:bg-white hover:text-black px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
          >
            Return to Root
          </Link>
        </div>
      </div>
    </div>
  );
}

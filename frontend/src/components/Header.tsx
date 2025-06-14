import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-[#0D1B2A]/70 backdrop-blur-lg shadow-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold flex items-center gap-2 text-orange-400 font-display hover:opacity-90 transition-opacity">
          <Image src="/logo.png" alt="Kit of You" width={32} height={32} />
          Kit of You
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
            Main
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-orange-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
            Contacts
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
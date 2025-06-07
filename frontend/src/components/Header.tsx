import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-gray-800  shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold flex align-items-center gap-2 text-[#D99243]">
          <Image src="/logo.png" alt="Kit of You" width={32} height={32} />
            Kit of You
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white">
              Main
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">
              Contacts
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#0D1B2A] text-gray-300 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold flex items-center gap-2 text-[#D99243]">
              
            <Image src="/logo.png" alt="Kit of You" width={32} height={32} />
            Kit of You
            </Link>
            <p className="text-gray-400">
              Your reliable partner in the world of high-quality products
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Main
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacts</h4>
            <ul className="space-y-2">
              <li>Email: contacts@kitofu.shop</li>
              <li>Address: Dluga 8/16, 31-149, Krakow, Poland</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Kit of You. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
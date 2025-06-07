import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold flex align-items-center gap-2 text-[#D99243]">
              
            <Image src="/logo.png" alt="Kit of You" width={32} height={32} />
            Kit of You
            </Link>
            <p className="text-gray-300">
              Your reliable partner in the world of high-quality products
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Main
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacts</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: contacts@kitofu.shop</li>
              <li>Address: Dluga 8/16, 31-149, Krakow, Poland</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Kit of You. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
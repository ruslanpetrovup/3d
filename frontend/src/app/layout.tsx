import '../styles/globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-poppins' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>3D Starter Pack — Create Your Custom 3D Model from a Photo</title>
        <meta name="description" content="Get your unique 3D model generated from your photo! Perfect for avatars, gifts, and digital collections. Fast, easy, and high-quality 3D starter packs." />
        <meta name="keywords" content="3D model, starter pack, photo to 3D, avatar, custom 3D, digital gift, 3D avatar, 3D printing, personalized model, AI 3D generator" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://kitofu.shop/" />
        <meta property="og:title" content="3D Starter Pack — Create Your Custom 3D Model from a Photo" />
        <meta property="og:description" content="Get your unique 3D model generated from your photo! Perfect for avatars, gifts, and digital collections. Fast, easy, and high-quality 3D starter packs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kitofu.shop/" />
        <meta property="og:image" content="https://i.ibb.co/fdDbxQqD/example1.png" />
        <meta property="og:site_name" content="3D Starter Pack" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="3D Starter Pack — Create Your Custom 3D Model from a Photo" />
        <meta name="twitter:description" content="Get your unique 3D model generated from your photo! Perfect for avatars, gifts, and digital collections. Fast, easy, and high-quality 3D starter packs." />
        <meta name="twitter:image" content="https://i.ibb.co/fdDbxQqD/example1.png" />
      </Head>
      <body
        className={`${inter.variable} ${poppins.variable} bg-gradient-to-b from-[#0D1B2A] to-[#1B263B] text-white min-h-screen flex flex-col`}
      >
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rfste67hdh");
            `,
          }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
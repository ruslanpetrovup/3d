import Image from 'next/image';

export const metadata = {
  title: "About — 3D Starter Pack",
  description: "Learn more about 3D Starter Pack: how we create custom 3D models from your photos, our mission, and our team.",
  keywords: "about 3D starter pack, about 3D model service, about photo to 3D, about team, about project",
  openGraph: {
    title: "About — 3D Starter Pack",
    description: "Learn more about 3D Starter Pack: how we create custom 3D models from your photos, our mission, and our team.",
    url: "https://kitofu.shop/about",
    siteName: "3D Starter Pack",
    images: [
      {
        url: "https://kitofu.shop/icon.png",
        width: 1200,
        height: 630,
        alt: "About 3D Starter Pack",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — 3D Starter Pack",
    description: "Learn more about 3D Starter Pack: how we create custom 3D models from your photos, our mission, and our team.",
    images: ["https://kitofu.shop/icon.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">About Kit of You</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
          <p className="text-gray-300 mb-6">
            Kit of You is an innovative company that strives to make quality products accessible to everyone. 
            We believe that every person deserves access to the best products at reasonable prices.
          </p>
          <p className="text-gray-300">
            Our goal is to create a community where everyone can find exactly what they need 
            and enjoy the shopping experience.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/model.png"
            alt="About Kit of You"
            className="object-cover"
            width={800}
            height={800}
            objectFit='cover'
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-white">Quality</h3>
          <p className="text-gray-300">
            We carefully select each product to guarantee the highest quality standards.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-white">Innovation</h3>
          <p className="text-gray-300">
            We constantly evolve and implement new technologies to improve our service.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-white">Reliability</h3>
          <p className="text-gray-300">
            We guarantee the security of every transaction and protect our customers' interests.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Our Team</h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto">
          We are a team of professionals united by a common goal: to make the world better through quality products and excellent service. 
          Each member of our team contributes to the company's development and customer satisfaction.
        </p>
      </div>
    </div>
  );
} 
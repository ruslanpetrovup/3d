import HomePage from "@/components/HomePage";

export const metadata = {
  title: "3D Starter Pack — Create Your Custom 3D Model from a Photo",
  description: "Get your unique 3D model generated from your photo! Perfect for avatars, gifts, and digital collections. Fast, easy, and high-quality 3D starter packs.",
  keywords: "3D model, starter pack, photo to 3D, avatar, custom 3D, digital gift, 3D avatar, 3D printing, personalized model, AI 3D generator",
  openGraph: {
    title: "3D Starter Pack — Create Your Custom 3D Model from a Photo",
    description: "Get your unique 3D model generated from your photo! Perfect for avatars, gifts, and digital collections. Fast, easy, and high-quality 3D starter packs.",
    url: "https://kitofu.shop/",
    siteName: "3D Starter Pack",
    images: [
      {
        url: "https://kitofu.shop/icon.png",
        width: 1200,
        height: 630,
        alt: "3D Starter Pack",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Starter Pack — Create Your Custom 3D Model from a Photo",
    description: "Get your unique 3D model generated from your photo! Perfect for avatars, gifts, and digital collections. Fast, easy, and high-quality 3D starter packs.",
    images: ["https://kitofu.shop/icon.png"],
  },
};

export default function Page() {
  return <HomePage />;
}

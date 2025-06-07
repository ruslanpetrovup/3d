import { Suspense } from 'react';
import PreviewPage from "../../components/pages/Preview";

export const metadata = {
  title: "Preview — 3D Starter Pack",
  description: "Preview your custom 3D model generated from your photo. Download, order, or regenerate your unique 3D starter pack!",
  keywords: "3D model preview, starter pack, photo to 3D, avatar, custom 3D, download 3D, order 3D model, regenerate 3D",
  openGraph: {
    title: "Preview — 3D Starter Pack",
    description: "Preview your custom 3D model generated from your photo. Download, order, or regenerate your unique 3D starter pack!",
    url: "https://kitofu.shop/preview",
    siteName: "3D Starter Pack",
    images: [
      {
        url: "https://kitofu.shop/icon.png",
        width: 1200,
        height: 630,
        alt: "3D Starter Pack Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preview — 3D Starter Pack",
    description: "Preview your custom 3D model generated from your photo. Download, order, or regenerate your unique 3D starter pack!",
    images: ["https://kitofu.shop/icon.png"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Загрузка...</div>}>
      <PreviewPage />
    </Suspense>
  );
}

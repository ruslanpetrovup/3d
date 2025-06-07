import ThankYouPage from "@/components/ThankYouPage";

export const metadata = {
  title: "Thank You — 3D Starter Pack",
  description: "Thank you for your order! We are preparing your custom 3D model. Track your order and get support from 3D Starter Pack.",
  keywords: "thank you, order success, 3D starter pack, order tracking, 3D model order, payment success",
  openGraph: {
    title: "Thank You — 3D Starter Pack",
    description: "Thank you for your order! We are preparing your custom 3D model. Track your order and get support from 3D Starter Pack.",
    url: "https://kitofu.shop/thanks-payment",
    siteName: "3D Starter Pack",
    images: [
      {
        url: "https://kitofu.shop/icon.png",
        width: 1200,
        height: 630,
        alt: "Thank You 3D Starter Pack",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You — 3D Starter Pack",
    description: "Thank you for your order! We are preparing your custom 3D model. Track your order and get support from 3D Starter Pack.",
    images: ["https://kitofu.shop/icon.png"],
  },
};

export default function Page() {
  return <ThankYouPage />;
}

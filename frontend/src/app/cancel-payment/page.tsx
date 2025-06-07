import CancelPaymentPage from "@/components/CancelPaymentPage";

export const metadata = {
  title: "Payment Cancelled — 3D Starter Pack",
  description: "Your payment was cancelled or failed. Please try again to get your custom 3D model from a photo!",
  keywords: "payment cancelled, payment failed, 3D starter pack, order failed, 3D model, retry payment",
  openGraph: {
    title: "Payment Cancelled — 3D Starter Pack",
    description: "Your payment was cancelled or failed. Please try again to get your custom 3D model from a photo!",
    url: "https://kitofu.shop/cancel-payment",
    siteName: "3D Starter Pack",
    images: [
      {
        url: "https://kitofu.shop/icon.png",
        width: 1200,
        height: 630,
        alt: "Payment Cancelled 3D Starter Pack",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Cancelled — 3D Starter Pack",
    description: "Your payment was cancelled or failed. Please try again to get your custom 3D model from a photo!",
    images: ["https://kitofu.shop/icon.png"],
  },
};

export default function Page() {
  return <CancelPaymentPage />;
}
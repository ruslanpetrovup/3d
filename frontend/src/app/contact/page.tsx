import ContactPage from "@/components/ContactPage";

export const metadata = {
  title: "Contact — 3D Starter Pack",
  description: "Contact 3D Starter Pack team for support, questions, or partnership. We are here to help you create your custom 3D model from a photo!",
  keywords: "contact 3D starter pack, contact 3D model service, support, help, partnership, email, feedback",
  openGraph: {
    title: "Contact — 3D Starter Pack",
    description: "Contact 3D Starter Pack team for support, questions, or partnership. We are here to help you create your custom 3D model from a photo!",
    url: "https://kitofu.shop/contact",
    siteName: "3D Starter Pack",
    images: [
      {
        url: "https://kitofu.shop/icon.png",
        width: 1200,
        height: 630,
        alt: "Contact 3D Starter Pack",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — 3D Starter Pack",
    description: "Contact 3D Starter Pack team for support, questions, or partnership. We are here to help you create your custom 3D model from a photo!",
    images: ["https://kitofu.shop/icon.png"],
  },
};

export default function Page() {
  return <ContactPage />;
} 
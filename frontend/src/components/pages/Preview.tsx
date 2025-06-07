'use client';

import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OrderModal from '@/components/OrderModal';
import UploadImageButton from '../UploadImageButton';

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageId = searchParams.get('id');

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const fetchImage = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/preview/temp-photos/${id}`
      );
      if (!response.ok) throw new Error('Image fetch failed');

      const data = await response.json();
      setGeneratedImage(data.data.url_image);
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  const regenerate = async () => {
    if (!imageId) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('imageId', imageId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/preview/generate-preview`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Regeneration failed');

      const data = await response.json();
      const newId = data.data.id;

      router.push(`/preview?id=${newId}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to regenerate image.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageId) {
      fetchImage(imageId);
    }
  }, [imageId]);

  return (
    <main className="min-h-screen bg-[#0D1B2A] text-white px-4 py-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center leading-tight bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent uppercase">Your Starter Pack!</h1>

      <div className="relative w-full max-w-md mb-8">
        {loading ? (
          <div className="w-full aspect-square bg-[#1B263B] rounded-xl flex items-center justify-center">
            <span className="text-gray-400 animate-pulse">Generating...</span>
          </div>
        ) : generatedImage ? (
          <Image
            src={generatedImage}
            alt="Generated image"
            width={448}
            height={400}
            className="rounded-xl border border-white/10 shadow-lg"
          />
        ) : (
          <div className="w-full aspect-square bg-[#1B263B] rounded-xl flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {generatedImage && (
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = generatedImage;
              link.download = 'starter-pack.png';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="bg-[#1D3557] hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
          >
            Save
          </button>
        )}
        <UploadImageButton className="bg-[#1D3557] hover:bg-[#18314F] text-white px-6 py-3 rounded-xl transition" title={"Regenerate"}/>
      </div>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-[#F97316] hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition w-full mt-6 max-w-md"
      >
        Order now
      </button>

      {imageId && (
        <OrderModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          photoId={imageId}
        />
      )}
    </main>
  );
}

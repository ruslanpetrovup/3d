'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const fallbackPhotos = [
  {
    id: 'example1',
    title: 'Example Model 1',
    imageUrl: '/models/example1.png',
  },
  {
    id: 'example2',
    title: 'Example Model 2',
    imageUrl: '/models/example2.png',
  },
  {
    id: 'example3',
    title: 'Example Model 3',
    imageUrl: '/models/example3.png',
  },
];

interface Photo {
  id: number | string;
  title: string;
  imageUrl: string;
  createdAt?: Date;
}

export default function LatestModels() {
  const [photos, setPhotos] = useState<Photo[]>(fallbackPhotos);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchPhotos = async () => {
  //     try {
  //       const response = await fetch('/api/preview/latest');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch photos');
  //       }
  //       const data = await response.json();
  //       if (data.length === 0) {
  //         setPhotos(fallbackPhotos);
  //       } else {
  //         setPhotos(data);
  //       }
  //     } catch (err) {
  //       setPhotos(fallbackPhotos);
  //       setError(err instanceof Error ? err.message : 'An error occurred');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPhotos();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error && photos.length === 0) return <div>Error: {error}</div>;



  return (
    <div className="w-full max-w-6xl mt-10 mx-auto py-8">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Latest Models</h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ paddingBottom: 40 }}
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
              <div className="relative w-full h-90">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 
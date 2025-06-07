'use client';

import Image from 'next/image';

const slides = [
  '/models/example1.jpg',
  '/models/example2.jpg',
  '/models/example3.jpg',
  '/models/example1.jpg',
  '/models/example2.jpg',
  '/models/example3.jpg',
];

export default function ImageGrid() {
  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {slides.map((src, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden">
            <Image
              src={src}
              alt={`Slide ${index}`}
              width={450}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

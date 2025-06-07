import Image from 'next/image';
import Link from 'next/link';

interface ModelCardProps {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  createdAt: string;
}

const ModelCard = ({ id, title, imageUrl, author, createdAt }: ModelCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 truncate">{title}</h3>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>by {author}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <Link 
          href={`/preview/${id}`}
          className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Model
        </Link>
      </div>
    </div>
  );
};

export default ModelCard; 
import { PlayCircle } from 'lucide-react';
import type { PhotoI } from '../../../types/photo.types';


const PhotoItem: React.FC<{
  photo: PhotoI;
}> = ({ photo }) => {
  return (
    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition-shadow">
      <img
        src={photo.src}
        alt={photo.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
      {photo.type === 'video' && (
        <div className="absolute top-2 right-2">
          <PlayCircle className="w-6 h-6 text-white opacity-80" />
        </div>
      )}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
    </div>
  );
};

export default PhotoItem
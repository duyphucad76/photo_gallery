import PhotoItem from '../PhotoItem';

import type { PhotoGroupI } from '../../../types/photo.types';




const PhotoGroup: React.FC<{
  group: PhotoGroupI;
}> = ({ group }) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Tháng {group.month} {group.year}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {group.photos.map((photo) => (
          <PhotoItem key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default PhotoGroup
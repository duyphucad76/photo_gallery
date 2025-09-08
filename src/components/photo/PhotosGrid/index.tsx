import type { PhotoGroupI } from '../../../types/photo.types';
import PhotoGroup from '../PhotoGroup';

const PhotosGrid: React.FC<{
  groupedPhotos: PhotoGroupI[];
}> = ({ groupedPhotos }) => {
  return (
    <div className="space-y-8">
      {groupedPhotos.map((group) => (
        <PhotoGroup
          key={`${group.year}-${group.month}`}
          group={group}
        />
      ))}
    </div>
  );
};

export default PhotosGrid
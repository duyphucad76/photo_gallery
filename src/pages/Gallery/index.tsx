import { useEffect, useState } from 'react';
import axios from 'axios';

type Photo = {
  _id: string;
  url: string;
  description?: string;
};

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/photos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPhotos(res.data);
      } catch (err) {
        alert('Không thể tải ảnh');
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Thư viện ảnh</h2>
      {loading ? (
        <p className="text-center">Đang tải ảnh...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo._id} className="border rounded overflow-hidden shadow-sm">
              <img
                src={photo.url}
                alt={photo.description || 'Ảnh'}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 text-sm text-gray-600">{photo.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default Gallery
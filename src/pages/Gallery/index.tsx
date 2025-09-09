import { useEffect, useState } from "react";
import PhotoCard from "../../components/photo/PhotoCard";
import { getAllImages, deleteImage, addFavoriteImages, removeFavoriteImages } from "../../services/images.service";
import { useOutletContext } from "react-router-dom";
import type { PhotoI } from "../../types/photo.types";

interface OutletContext {
  searchQuery: string;
}
interface ImageI extends PhotoI {
  alt?: string;
  isLiked?: boolean;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageI[]>([]);
  const [loading, setLoading] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { searchQuery } = useOutletContext<OutletContext>();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await getAllImages(searchQuery);
        setImages(res.images);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [searchQuery]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    try {
      for (const photoId of selectedIds) {
        await deleteImage(photoId);
      }
      setImages((prev) => prev.filter((img) => !selectedIds.includes(img.id)));
      setSelectedIds([]);
      setRemoveMode(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Gọi API like/unlike
  const toggleLike = async (id: string, isLiked: boolean | undefined) => {
    try {
      if (isLiked) {
        await removeFavoriteImages([id]);
      } else {
        await addFavoriteImages([id]);
      }
      // cập nhật state local
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, isLiked: !isLiked } : img
        )
      );
    } catch (e) {
      console.error("Lỗi khi gọi API like/unlike:", e);
    }
  };

  return (
    <div className="p-6">
      {/* Nút xóa */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setRemoveMode(!removeMode)}
          className={`px-3 py-1 rounded ${
            removeMode ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          {removeMode ? "Thoát chế độ xóa" : "Xóa ảnh"}
        </button>
        {removeMode && selectedIds.length > 0 && (
          <button
            onClick={handleDelete}
            className="ml-auto px-4 py-1 rounded bg-green-500 text-white"
          >
            Xóa {selectedIds.length} ảnh
          </button>
        )}
      </div>

      {/* Grid ảnh */}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => {
            const isSelected = selectedIds.includes(image.id);
            const isLiked = image.isLiked ?? false;

            return (
              <div
                key={image.id}
                className={`relative rounded-lg overflow-hidden border-4 ${
                  isSelected
                    ? "border-red-500"
                    : "border-transparent hover:border-gray-300"
                } ${removeMode ? "cursor-pointer" : ""}`}
                onClick={() => removeMode && toggleSelect(image.id)}
              >
                <PhotoCard secureUrl={image.secureUrl} alt={image.alt} />

                {/* ✅ nút thích */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // tránh xung đột với chế độ xóa
                    toggleLike(image.id, isLiked);
                  }}
                  className="absolute top-2 right-2 bg-white/70 rounded-full p-2 shadow hover:scale-110 transition"
                >
                  {isLiked ? "❤️" : "🤍"}
                </button>

                {isSelected && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-lg font-bold">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Gallery;

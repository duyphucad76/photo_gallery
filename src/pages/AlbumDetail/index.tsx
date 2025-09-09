import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllImagesInAlbum,
} from "../../services/albums.service";

import type { PhotoI as Photo } from "../../types/photo.types";

import { addImageToAlbum, getAllImages, removeImageFromAlbum } from "../../services/images.service";


const AlbumDetail: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([]);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [mode, setMode] = useState<"add" | "remove" | null>(null);


  const fetchAllPhotos = async () => {
    const res = await getAllImages();
    setAllPhotos(res.images.filter((p: Photo) => p.album?.id != albumId));
  };

  const fetchAlbumPhotos = async () => {
    if (!albumId) return;
    const res = await getAllImagesInAlbum(albumId);
    setAlbumPhotos(res);
  };

  useEffect(() => {
    fetchAlbumPhotos();
    fetchAllPhotos();
  }, [albumId]);

  const toggleSelectPhoto = (photoId: string) => {
    setSelectedPhotoIds((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  const handleConfirm = async () => {
    if (!albumId || !mode) return;

    if (mode === "add") {
      for (const photoId of selectedPhotoIds) {
        await addImageToAlbum(photoId, albumId);
      }
      await fetchAlbumPhotos(); // reload lại
      await fetchAllPhotos();
    }

    if (mode === "remove") {
      for (const photoId of selectedPhotoIds) {
        await removeImageFromAlbum(photoId);
      }
      await fetchAlbumPhotos(); // reload lại
      await fetchAllPhotos();
      // setAlbumPhotos((prev) =>
      //   prev.filter((p) => !selectedPhotoIds.includes(p.id))
      // );
    }

    setSelectedPhotoIds([]);
    setMode(null);
  };

  // ✅ chọn dữ liệu để render
  const photosToRender =
    mode === "add" ? allPhotos : albumPhotos;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chi tiết Album</h2>

      {/* Chế độ hành động */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setMode("add")}
          className={`px-3 py-1 rounded ${mode === "add" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
        >
          Thêm file
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`px-3 py-1 rounded ${mode === "remove" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
        >
          Xóa file
        </button>

        {selectedPhotoIds.length > 0 && (
          <button
            onClick={handleConfirm}
            className="ml-auto px-4 py-1 rounded bg-green-500 text-white"
          >
            Xác nhận ({selectedPhotoIds.length})
          </button>
        )}
      </div>

      {/* Danh sách ảnh và video */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photosToRender.map((photo) => {
          const isSelected = selectedPhotoIds.includes(photo.id);
          const isSelectable = mode !== null; // chỉ cho chọn khi đang ở chế độ add/remove
          const isVideo = photo.format && ['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(photo.format.toLowerCase());

          return (
            <div
              key={photo.id}
              onClick={() => isSelectable && toggleSelectPhoto(photo.id)}
              className={`relative rounded-lg overflow-hidden border-4 ${isSelected
                ? "border-blue-500"
                : "border-transparent hover:border-gray-300"
                } ${isSelectable ? "cursor-pointer" : ""}`}
            >
              {/* Hiển thị video hoặc ảnh */}
              {isVideo ? (
                <video
                  src={photo.secureUrl}
                  className="w-full h-40 object-cover"
                  controls
                  preload="metadata"
                />
              ) : (
                <img
                  src={photo.secureUrl}
                  alt={'Image'}
                  className="w-full h-40 object-cover"
                />
              )}

              {/* Icon để phân biệt video/ảnh */}
              {isVideo && (
                <div className="absolute top-2 left-2 bg-black/70 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l7-5-7-5z" />
                  </svg>
                </div>
              )}

              {isSelected && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-lg font-bold">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumDetail;

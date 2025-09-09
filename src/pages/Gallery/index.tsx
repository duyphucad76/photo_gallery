import { useEffect, useState } from "react";
import PhotoCard from "../../components/photo/PhotoCard";
import {
  getAllImages,
  deleteImage,
  addFavoriteImages,
  removeFavoriteImages,
} from "../../services/images.service";
import { useOutletContext } from "react-router-dom";
import type { PhotoI } from "../../types/photo.types";

interface OutletContext {
  searchQuery: string;
}
interface ImageI extends PhotoI {
  alt?: string;
  isLiked?: boolean;
}
type pageNavi = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  remainingPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
};
const Gallery = () => {
  const [images, setImages] = useState<ImageI[]>([]);
  const [loading, setLoading] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { searchQuery } = useOutletContext<OutletContext>();
  const [pagenav, setPagenav] = useState({} as pageNavi);
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await getAllImages(searchQuery, page, limit);
        setImages(res.images);
        setPagenav(res.pagination);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [searchQuery, page]);

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
        prev.map((img) => (img.id === id ? { ...img, isLiked: !isLiked } : img))
      );
    } catch (e) {
      console.error("Lỗi khi gọi API like/unlike:", e);
    }
  };

  // Tạo mảng số trang hiển thị
  const getPageNumbers = () => {
    const pages = [];
    const { currentPage, totalPages } = pagenav;
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  // Tính toán số thứ tự ảnh đang xem
  const startIdx = (pagenav.currentPage - 1) * pagenav.itemsPerPage + 1;
  const endIdx = Math.min(
    pagenav.currentPage * pagenav.itemsPerPage,
    pagenav.totalItems
  );

  // Sự kiện chuyển trang
  const goToPage = (pageNum: number) => {
    if (
      pageNum < 1 ||
      pageNum > pagenav.totalPages ||
      pageNum === pagenav.currentPage
    )
      return;
    setPage(pageNum);
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
          {removeMode ? "Thoát chế độ xóa" : "Xóa file"}
        </button>
        {removeMode && selectedIds.length > 0 && (
          <button
            onClick={handleDelete}
            className="ml-auto px-4 py-1 rounded bg-green-500 text-white"
          >
            Xóa {selectedIds.length} file
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
            const isVideo = image.format && ['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(image.format.toLowerCase());

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
                {/* Hiển thị video hoặc ảnh */}
                {isVideo ? (
                  <video
                    className="w-full h-64 object-cover"
                    controls
                    preload="metadata"
                  >
                    <source src={image.secureUrl} type={`video/${image.format}`} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <PhotoCard secureUrl={image.secureUrl} alt={image.alt} />
                )}

                {/* Icon để phân biệt video/ảnh */}
                {isVideo && (
                  <div className="absolute top-2 left-2 bg-black/70 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 9a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path fillRule="evenodd" d="M10 8a1 1 0 011 1v2a1 1 0 11-2 0V9a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

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
      )}{" "}
      {/* Phân trang động */}
      {pagenav.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!pagenav.hasPreviousPage}
              onClick={() => goToPage(pagenav.currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!pagenav.hasNextPage}
              onClick={() => goToPage(pagenav.currentPage + 1)}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIdx}</span> to{" "}
                <span className="font-medium">{endIdx}</span> of{" "}
                <span className="font-medium">{pagenav.totalItems}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-xs"
              >
                <button
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!pagenav.hasPreviousPage}
                  onClick={() => goToPage(pagenav.currentPage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="size-5"
                  >
                    <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" />
                  </svg>
                </button>
                {getPageNumbers().map((num, idx) =>
                  num === "..." ? (
                    <span
                      key={idx}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 focus:outline-offset-0"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={num}
                      aria-current={
                        num === pagenav.currentPage ? "page" : undefined
                      }
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                        num === pagenav.currentPage
                          ? "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() => goToPage(Number(num))}
                    >
                      {num}
                    </button>
                  )
                )}
                <button
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!pagenav.hasNextPage}
                  onClick={() => goToPage(pagenav.currentPage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="size-5"
                  >
                    <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

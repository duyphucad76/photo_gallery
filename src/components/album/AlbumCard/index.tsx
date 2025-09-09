import { Edit3, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AlbumCardProps {
  id: string | number;
  title: string;
  description?: string;
  coverPhotos: string[];
  onUpdate: (id: string | number, data: { title?: string; description?: string; cover?: string }) => void;
  onDelete?: (id: string | number) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  id,
  title,
  description,
  coverPhotos,
  onUpdate,
  onDelete,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);

  const [editCover, setEditCover] = useState<string | undefined>();
  const navigate = useNavigate();


  const handleSave = () => {
    onUpdate(id, { title: editTitle, description: editDesc, cover: editCover });
    setShowEditModal(false);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition bg-white">
      <div
        className="grid grid-cols-2 grid-rows-2 h-40 cursor-pointer"
        onClick={() => navigate(`/albums/${id}`, { state: { title } })}
      >
        {coverPhotos.slice(0, 4).map((src, idx) => (
          <img key={idx} src={src} alt={title} className="w-full h-full object-cover" />
        ))}
        {coverPhotos.length === 0 && (
          <div className="col-span-2 row-span-2 flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="p-3 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-1 text-gray-600 hover:text-blue-500"
            title="Chỉnh sửa album"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-1 text-gray-600 hover:text-red-500"
            title="Xóa album"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Modal Edit */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa album</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ảnh</label>
                <input
                  value={editCover}
                  onChange={(e) => setEditCover(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Delete */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Xác nhận</h2>
            <p className="mb-6">Bạn có chắc muốn xóa album "{title}"?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AlbumCard;

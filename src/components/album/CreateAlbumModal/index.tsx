import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description?: string, cover_image?: string) => void;
  // onCreate: (title: string, description?: string, cover_image?: File) => void;
}

const CreateAlbumModal: React.FC<CreateAlbumModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const navigate = useNavigate()

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    navigate('/albums')
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-lg font-bold mb-4">Tạo Album mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên Album</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium mb-1">Ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-3"
            />

            {coverImage && (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="preview"
                className="w-32 h-32 object-cover rounded mb-3"
              />
            )}
          </div> */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                setCoverImage(null);
                onClose();
              }}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAlbumModal;

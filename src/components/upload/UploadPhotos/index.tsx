import React, { useState } from "react";

interface UploadImagesProps {
  albums: { id: string; title: string }[]; // danh sách album có sẵn
  onUpload: (files: {
    file: File;
    album: string; // id hoặc tên album mới
    tags: string[];
  }[]) => void;
}

const UploadPhotos: React.FC<UploadImagesProps> = ({ albums, onUpload }) => {
  const [images, setImages] = useState<
    { file: File; album: string; tags: string; isNewAlbum?: boolean }[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        album: "", // mặc định chưa chọn album
        tags: "",
        isNewAlbum: false,
      }));
      setImages(filesArray);
    }
  };

  const handleAlbumChange = (index: number, value: string) => {
    const updated = [...images];
    if (value === "new") {
      updated[index].album = "";
      updated[index].isNewAlbum = true;
    } else {
      updated[index].album = value;
      updated[index].isNewAlbum = false;
    }
    setImages(updated);
  };

  const handleNewAlbumName = (index: number, name: string) => {
    const updated = [...images];
    updated[index].album = name;
    setImages(updated);
  };

  const handleTagsChange = (index: number, newTags: string) => {
    const updated = [...images];
    updated[index].tags = newTags;
    setImages(updated);
  };

  const handleUpload = () => {
    if (images.length === 0) {
      alert("Vui lòng chọn ít nhất một ảnh!");
      return;
    }

    const formatted = images.map((img) => ({
      file: img.file,
      album: img.album, // id album có sẵn hoặc tên album mới
      tags: img.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }));

    onUpload(formatted);

    // reset
    setImages([]);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="h-16 px-4 bg-white shadow-md flex items-center justify-between shrink-0">
        <h2 className="text-lg font-bold">Upload nhiều ảnh</h2>
        <div className="flex gap-2 items-center">
          <label className="px-3 py-2 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm">
            Chọn ảnh
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
          >
            Upload tất cả
          </button>
        </div>
      </div>

      {/* Preview ảnh */}
      <div className="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="border p-2 rounded-md bg-white shadow flex flex-col"
          >
            <img
              src={URL.createObjectURL(img.file)}
              alt="preview"
              className="w-full h-40 object-cover rounded mb-2"
            />

            {/* Chọn album */}
            <select
              className="w-full p-2 mb-2 border rounded text-sm"
              value={img.isNewAlbum ? "new" : img.album}
              onChange={(e) => handleAlbumChange(index, e.target.value)}
            >
              <option value="">-- Chọn album --</option>
              {albums.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
              <option value="new">+ Tạo album mới</option>
            </select>

            {/* Input cho album mới */}
            {img.isNewAlbum && (
              <input
                type="text"
                value={img.album}
                onChange={(e) => handleNewAlbumName(index, e.target.value)}
                className="w-full p-2 mb-2 border rounded text-sm"
                placeholder="Nhập tên album mới"
              />
            )}

            {/* Tags */}
            <input
              type="text"
              value={img.tags}
              onChange={(e) => handleTagsChange(index, e.target.value)}
              className="w-full p-2 border rounded text-sm"
              placeholder="Nhập tags (phân cách bằng dấu phẩy)"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPhotos;

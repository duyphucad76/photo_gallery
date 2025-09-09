import React, { useEffect, useRef, useState } from "react";
import { uploadImages } from "../../services/images.service";
import { useNavigate } from "react-router-dom";
import { getAllTags } from "../../services/tags.service";
import { getAllAlbums } from "../../services/albums.service";
// import axiosInstance from "../../services/axiosInstance";

type UploadItem = {
  id: string;
  file: File;
  preview: string;
  tags: string; // CSV
  albumId: string | number;
};

interface UploadPhotosAccumulateProps {
  initialFiles?: File[];
  uploadLabel?: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Album {
  id: number;
  title: string;
  description: string;
}

const makeId = (file: File) =>
  `${file.name}_${file.size}_${file.lastModified}`;

const Upload: React.FC<UploadPhotosAccumulateProps> = ({
  initialFiles = [],
  uploadLabel = "Upload tất cả",
}) => {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [tagsList, setTagsList] = useState<Tag[]>([]); // tất cả tag từ backend
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [albumList, setAlbumList] = useState<Album[]>([]); // danh sách album từ backend
  const [selectedAlbum, setSelectedAlbum] = useState<string>(""); // album đang chọn

  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // lấy danh sách tag từ backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await getAllTags()
        setTagsList(res);
      } catch (e) {
        console.error("Không thể load tags:", e);
      }
    };
    const fetchAlbums = async () => {
      try {
        const res = await getAllAlbums()
        setAlbumList(res);
      } catch (e) {
        console.error("Không thể load albums:", e);
      }
    }
    fetchTags();
    fetchAlbums();
  }, []);

  // nếu có initialFiles, thêm lúc mount
  useEffect(() => {
    if (!initialFiles || initialFiles.length === 0) return;

    const initialItems = initialFiles.map((f) => ({
      id: makeId(f),
      file: f,
      preview: URL.createObjectURL(f),
      tags: "",
      albumId: "",
    }));
    setItems((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const toAdd = initialItems.filter((it) => !existingIds.has(it.id));
      return [...prev, ...toAdd];
    });
  }, []);

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      items.forEach((it) => URL.revokeObjectURL(it.preview));
    };
  }, [items]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: UploadItem[] = [];
    const existingIds = new Set(items.map((it) => it.id));

    for (const f of Array.from(files)) {
      const id = makeId(f);
      if (!existingIds.has(id)) {
        newItems.push({
          id,
          file: f,
          preview: URL.createObjectURL(f),
          tags: "",
          albumId: "",
        });
        existingIds.add(id);
      }
    }

    if (newItems.length > 0) {
      setItems((prev) => [...prev, ...newItems]);
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = "";
  };

  const handleRemove = (id: string) => {
    setItems((prev) => {
      const next = prev.filter((it) => it.id !== id);
      const removed = prev.find((it) => it.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return next;
    });
  };

  const handleClearAll = () => {
    items.forEach((it) => URL.revokeObjectURL(it.preview));
    setItems([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  // gán tag chung cho tất cả ảnh
  const handleAddTagsToAll = () => {
    if (selectedTags.length === 0) return;
    setItems((prev) =>
      prev.map((it) => {
        const existing = it.tags ? it.tags.split(",").map((t) => t.trim()) : [];
        const merged = Array.from(new Set([...existing, ...selectedTags]));
        return { ...it, tags: merged.join(",") };
      })
    );
    setSelectedTags([]);
  };

  // gán album cho tất cả ảnh
  const handleSelectAlbum = () => {
    if (!selectedAlbum) return;
    setItems((prev) =>
      prev.map((it) => ({
        ...it,
        albumId: selectedAlbum,
      }))
    );
  };

  const handleUploadAll = async () => {
    if (items.length === 0) {
      alert("Vui lòng chọn ít nhất một file!");
      return;
    }

    const formData = new FormData();
    items.forEach((it) => {
      formData.append("files", it.file);
      formData.append("tags", it.tags);
      formData.append("albumId", String(it.albumId));
    });

    try {
      const res = await uploadImages(formData);
      if (res) {
        console.log("Upload thành công!");
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }

    items.forEach((it) => URL.revokeObjectURL(it.preview));
    setItems([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-16 px-4 bg-white shadow flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upload file</h2>

        <div className="flex items-center gap-2">
          <label className="inline-flex items-center px-3 py-2 bg-gray-100 border rounded cursor-pointer hover:bg-gray-200 text-sm">
            Chọn file
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              onClick={handleInputClick}
              className="hidden"
            />
          </label>

          <button
            onClick={handleUploadAll}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            disabled={items.length === 0}
          >
            {uploadLabel}
          </button>

          <button
            onClick={handleClearAll}
            className="px-3 py-2 border rounded hover:bg-gray-100 text-sm"
            disabled={items.length === 0}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Grid previews + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Cột trái */}
        <div className="flex-1 p-4 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              Chưa có file nào được chọn
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((it) => {
                const isVideo = it.file.type.startsWith('video/');
                
                return (
                  <div
                    key={it.id}
                    className="bg-white rounded shadow p-2 flex flex-col"
                  >
                    <div className="relative">
                      {isVideo ? (
                        <video
                          src={it.preview}
                          className="w-full h-40 object-cover rounded"
                          controls
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={it.preview}
                          className="w-full h-40 object-cover rounded"
                          alt="Preview"
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
                      
                      <button
                        onClick={() => handleRemove(it.id)}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        title="Xóa file"
                        type="button"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-2 text-xs text-gray-600">
                      <div className="font-medium">{isVideo ? '🎥 Video' : '🖼️ Ảnh'}</div>
                      {it.tags ? `Tags: ${it.tags}` : "Chưa có tag"}
                      <br />
                      {it.albumId ? `Album: ${it.albumId}` : "Chưa chọn album"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar bên phải */}
        <div className="w-64 p-4 bg-white border-l shadow flex flex-col gap-4">
          {/* Tags */}
          <div>
            <h3 className="font-medium mb-2">Chọn tag</h3>
            <select
              multiple
              value={selectedTags}
              onChange={(e) =>
                setSelectedTags(
                  Array.from(e.target.selectedOptions).map((o) => o.value)
                )
              }
              className="flex-1 p-2 border rounded text-sm w-full h-32"
            >
              {tagsList.map((tag) => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddTagsToAll}
              className="mt-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm w-full"
            >
              + Gán tag cho tất cả
            </button>
          </div>

          {/* Album */}
          <div>
            <h3 className="font-medium mb-2">Chọn Album</h3>
            <select
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
              className="flex-1 p-2 border rounded text-sm w-full"
            >
              <option value="">-- Chưa chọn --</option>
              {albumList.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>

            <button
              onClick={handleSelectAlbum}
              className="mt-2 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm w-full"
            >
              + Gán album cho tất cả
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

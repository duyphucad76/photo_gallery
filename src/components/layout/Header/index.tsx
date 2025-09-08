import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Search,
  Plus,
  HelpCircle,
  Settings,
  MoreHorizontal,
  ImageIcon,
  Upload,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import defaultAvatar from "../../../assets/default_avatar.jpg";
import { useAuth } from "../../../context/AuthContext";
import CreateMenu from "../../ui/CreateMenu";
import CreateAlbumModal from "../../album/CreateAlbumModal";
import CreateTagModal from "../../tag/CreateTagModal";
import { createAlbum } from "../../../services/albums.service";

import type { MenuItem } from "../../../types/ui.types";
import { createTag } from "../../../services/tags.service";
import { logout } from "../../../services/auth.service";

interface HeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void; // gửi query lên parent
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { avatar } = useAuth();

  // đóng menu khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // menu "Tạo" dropdown
  const menuItems: MenuItem[] = [
    { icon: ImageIcon, label: "Tạo Album mới" },
    { divider: true },
    { icon: ImageIcon, label: "Tạo Tag mới" },
    { divider: true },
    { icon: Upload, label: "Thêm ảnh", url: "/upload" },
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.label === "Tạo Album mới") {
      setShowCreateAlbum(true);
    }
    if (item.label === "Tạo Tag mới") {
      setShowCreateTag(true);
    }
    if (item.url) {
      setIsOpen(false);
      navigate(item.url);
    }
    setIsOpen(false);
  };

  // tạo album
  const handleCreateAlbum = async (
    title: string,
    description: string = "",
    cover_image: string = ""
  ) => {
    try {
      const res = await createAlbum(title, description, cover_image);
      console.log("Album đã tạo:", res);
      if (res) navigate("/albums");
    } catch (e) {
      console.error(e);
    }
  };


  const handleCreateTag = async (name: string) => {
    try {
      const res = await createTag(name);
      console.log("Album đã tạo:", res.message);
    } catch (e) {
      console.error(e)
    }
    return
  }
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-1 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Image className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-normal text-gray-800">
              Google Photos
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm ảnh hoặc album..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="flex items-center gap-3 relative"
          ref={menuRef}
        >
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Plus className="w-6 h-6 text-gray-600" />
          </button>
          {isOpen && (
            <CreateMenu menuItems={menuItems} onItemClick={handleMenuClick} />
          )}

          {/* Modal tạo album */}
          <CreateAlbumModal
            isOpen={showCreateAlbum}
            onClose={() => setShowCreateAlbum(false)}
            onCreate={handleCreateAlbum}
          />

          <CreateTagModal
            isOpen={showCreateTag}
            onClose={() => setShowCreateTag(false)}
            onCreate={handleCreateTag}

          />


          {/* Avatar */}
          <img
            onClick={logout}
            src={avatar || defaultAvatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

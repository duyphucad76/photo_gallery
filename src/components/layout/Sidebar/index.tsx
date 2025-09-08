import React, { useEffect, useState } from "react";
import { Image, Folder, Star, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  url: string;
}

const items: SidebarItem[] = [
  { id: "photos", label: "Ảnh", icon: <Image size={20} />, url: "/" },
  { id: "albums", label: "Album", icon: <Folder size={20} />, url: "/albums" },
  { id: "favorites", label: "Ảnh yêu thích", icon: <Star size={20} />, url: "/favorites" },
];

const Sidebar = ({
  defaultSelected = "photos",
  onSelect,
}: {
  defaultSelected?: string;
  onSelect?: (id: string) => void;
}) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    let current: SidebarItem | undefined;

    for (const item of items) {
      if (item.url === "/") {
        // chỉ match đúng root
        if (location.pathname === "/") {
          current = item;
          break;
        }
      } else if (location.pathname.startsWith(item.url)) {
        current = item;
        break;
      }
    }

    if (current) {
      setSelected(current.id);
      onSelect?.(current.id);
    }
  }, [location.pathname]);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <div
      className={`h-full bg-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Header với nút toggle */}
      <div className="flex items-center justify-between px-3 py-4 border-b">
        {!collapsed && <h1 className="font-bold text-lg">Gallery</h1>}
        <button
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* List items */}
      <ul className="flex-1 mt-2">
        {items.map((item) => (
          <Link
            to={item.url}
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition ${
              selected === item.id
                ? "bg-gray-100 font-medium text-blue-600 border-l-4 border-blue-500"
                : ""
            }`}
          >
            <span>{item.icon}</span>
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

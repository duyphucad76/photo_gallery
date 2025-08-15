import React, { useEffect, useRef, useState } from 'react';
import CreateMenu from '../../ui/CreateMenu';
import {
  Image,
  Search,
  Plus,
  HelpCircle,
  Settings,
  MoreHorizontal,
  ImageIcon,
  Layers,
  Play,
  Share2,
  Upload,
  Users
} from 'lucide-react';

import type { MenuItem } from '../../../types/ui.types';

const Header: React.FC<{
  searchQuery: string;
  onSearchChange: (query: string) => void;
}> = ({ searchQuery, onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems: MenuItem[] = [
    { icon: ImageIcon, label: 'Album' },
    { icon: Layers, label: 'Ảnh ghép' },
    { icon: Play, label: 'Video khoảnh khắc nổi bật' },
    { icon: Users, label: 'Ảnh động' },
    { icon: Share2, label: 'Chia sẻ với người thân' },
    {
      divider: true,
      icon: 'symbol',
      label: ''
    },
    { icon: Upload, label: 'Nhập ảnh' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">

      <div className="flex items-center justify-between">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Image className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-normal text-gray-800">Google Photos</span>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm 'Thành phố Hồ Chí Minh'"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsOpen(prev => !prev)}
          >
            <Plus className="w-6 h-6 text-gray-600" />
          </button>
          {isOpen && <CreateMenu menuItems={menuItems} />}

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <HelpCircle className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-6 h-6 text-gray-600" />
          </button>
          <div className="w-8 h-8 bg-blue-500 rounded-full ml-2"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;

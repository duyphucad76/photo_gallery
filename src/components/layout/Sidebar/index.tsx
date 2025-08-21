import React from 'react';
import {
  Image,
  Clock,
  Heart,
  MapPin,
  Video,
  Users,
  Star,
  Folder,
  Cloud
} from 'lucide-react';

import SidebarNavItem from '../../ui/SidebarItem';

import type { SidebarItemI } from '../../../types/ui.types';

const Sidebar: React.FC<{
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ selectedCategory, onCategoryChange }) => {
  const sidebarItems: SidebarItemI[] = [
    { id: 'photos', icon: Image, label: 'Ảnh', active: true },
    { id: 'recent', icon: Clock, label: 'Tìm mới', active: false },
    { id: 'favorites', icon: Heart, label: 'Ảnh yêu thích', active: false },
    { id: 'people-pets', icon: Users, label: 'Người và thú cưng', active: false },
    { id: 'locations', icon: MapPin, label: 'Địa điểm', active: false },
    { id: 'videos', icon: Video, label: 'Video', active: false }
  ];

  const storageItems: SidebarItemI[] = [
    { id: 'albums', icon: Folder, label: 'Album', active: false },
    { id: 'archive', icon: Star, label: 'Tài liệu', active: false },
    { id: 'trash', icon: Cloud, label: 'Ảnh chụp màn hình và bản ghi hình', active: false },
    { id: 'starred', icon: Star, label: 'Ảnh yêu thích', active: false }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">


      <nav className="flex-1 px-2">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isSelected={selectedCategory === item.id}
              onClick={onCategoryChange}
            />
          ))}
        </div>

        <div className="mt-8">
          <h3 className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wide">
            Bộ sưu tập
          </h3>
          <div className="space-y-1 mt-2">
            {storageItems.map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                isSelected={false}
                onClick={onCategoryChange}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar
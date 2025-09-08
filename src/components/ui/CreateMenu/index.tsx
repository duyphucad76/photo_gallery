import React from 'react';
import type { MenuItem } from '../../../types/ui.types';
import { useNavigate } from 'react-router';

interface CreateMenuProps {
  menuItems: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
}

const CreateMenu: React.FC<CreateMenuProps> = ({ menuItems, onItemClick }) => {
  const navigate = useNavigate()
  return (
    <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="py-2">
        {menuItems.map((item, idx) =>
          item.divider ? (
            <div key={idx} className="border-t border-gray-200 my-2"></div>
          ) : (
            <button
              onClick={() => item.url ? navigate(item.url) : onItemClick?.(item)}
              key={idx}
              className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5 text-gray-600" />
              <span>{item.label}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CreateMenu;

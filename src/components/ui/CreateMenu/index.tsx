import React from 'react';
import type { MenuItem } from '../../../types/ui.types';

const CreateMenu: React.FC<MenuItem[]> = (menuItems) => {
  return (
    <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="py-2">
        {menuItems.map((item, idx) =>
          item.divider ? (
            <div key={idx} className="border-t border-gray-200 my-2"></div>
          ) : (
            <button
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

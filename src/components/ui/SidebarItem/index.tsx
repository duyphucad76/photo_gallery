import type { SidebarItemI } from '../../../types/photo.types';

const SidebarNavItem: React.FC<{
  item: SidebarItemI;
  isSelected: boolean;
  onClick: (id: string) => void;
}> = ({ item, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${isSelected
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      <item.icon className="w-5 h-5" />
      <span className="text-sm">{item.label}</span>
    </button>
  );
};


export default SidebarNavItem
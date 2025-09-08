import { Link } from 'react-router';
import type { SidebarItemI } from '../../../types/ui.types';

const SidebarNavItem: React.FC<{
  item: SidebarItemI;
  isSelected: boolean;
  onClick: (id: string) => void;
  collapsed?: boolean
}> = ({ item, isSelected, onClick }) => {
  return (
    <Link to={item.url}
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${isSelected
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      <item.icon className="w-5 h-5" />
      <span className="text-sm">{item.label}</span>
    </Link>
  );
};


export default SidebarNavItem
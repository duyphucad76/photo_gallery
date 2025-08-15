import type { CategoryCardI } from '../../../types/photo.types';

const CategoryCard: React.FC<{
  category: CategoryCardI;
}> = ({ category }) => {
  return (
    <div className="relative rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600"></div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
        <div className="p-4 text-white">
          <span className="text-2xl mr-2">{category.icon}</span>
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard
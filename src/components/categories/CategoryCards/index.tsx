import type { CategoryCardI } from '../../../types/ui.types';
import CategoryCard from '../CategoryCard';

const CategoryCards: React.FC = () => {
  const categories: CategoryCardI[] = [
    { id: 'beautiful', name: 'Những bức ảnh đẹp nhất', icon: '🏔️' },
    { id: 'moments', name: 'Khoảnh khắc điện ảnh mới', icon: '🎬' },
    { id: 'people', name: 'Ảnh động mới', icon: '👥' },
    { id: 'places', name: 'Ảnh có hiệu ứng điện ảnh', icon: '📍' }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};


export default CategoryCards
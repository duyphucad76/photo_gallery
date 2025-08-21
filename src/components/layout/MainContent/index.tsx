import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from '../Sidebar';
import { useState } from 'react';

interface MainContentProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('photos');

  return (
    <div className="flex-1 flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={onSearchChange} />

      <div className="flex flex-1">
        <aside className="w-64 border-r border-gray-200 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <Sidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainContent;

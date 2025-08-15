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

      <div className="p-6 flex-1">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default MainContent;

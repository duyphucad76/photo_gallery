import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useState } from "react";

const MainContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("photos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="flex-1 flex flex-col">
      <Header searchQuery={searchQuery} onSearch={setSearchQuery} />;

      <div className="flex flex-1">
        <aside className="border-r border-gray-200 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <Sidebar
            defaultSelected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
};

export default MainContent;

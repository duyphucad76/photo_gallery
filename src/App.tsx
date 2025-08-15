import Sidebar from './components/layout/Sidebar';
import { useState, useMemo, useEffect } from 'react';
import MainContent from './components/layout/MainContent';
// import useSampleData from './hooks/useSampleData';
import './App.css'
import type { PhotoGroupI } from './types/photo.types';
import Login from './pages/Login';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import CategoryCards from './components/categories/CategoryCards';
import PhotosGrid from './components/photos/PhotosGrid';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';

function App() {
  const groupedPhotos: PhotoGroupI[] = []; // dữ liệu ảnh
  const searchQuery: string = "";
  const onSearchChange = () => { };
  const isAuthenticated = () => {
    return !!localStorage.getItem("accessToken");
  };

  return (
    <div className="flex h-screen bg-white">
      <BrowserRouter>
        <Routes>
          {/* Layout chính */}
          <Route
            path="/"
            element={
              <MainContent
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
              />
            }
          >
            {/* Route con */}
            <Route
              index
              element={
                <>
                  <CategoryCards />
                  <PhotosGrid groupedPhotos={groupedPhotos} />
                </>
              }
            />
            <Route path="gallery" element={<Gallery />} />
            <Route path="upload" element={<Upload />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

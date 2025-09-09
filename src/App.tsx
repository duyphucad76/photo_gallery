import './App.css';
import { Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import renderRoutes from './utils/renderRoutes';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();
console.log(import.meta.env.VITE_REACT_BACKEND_BASEURL);
  return (
    <div className="flex h-screen bg-white">
      <Routes>
        {isAuthenticated
          ? renderRoutes(privateRoutes)
          : renderRoutes(publicRoutes)}
      </Routes>
    </div>
  );
}

export default App;

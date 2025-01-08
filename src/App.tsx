import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './components/Auth';
import StartPage from './components/StartPage';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Если localStorage пустой, отобразится Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute redirectTo="/about">
              <Auth />
            </ProtectedRoute>
          }
        />
        {/* Если есть значение в localStorage, откроется About */}
        <Route path="/about" element={<StartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

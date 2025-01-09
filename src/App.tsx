import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './components/Auth';
import StartPage from './components/StartPage';
import NotFound from './components/NotFound';
import GamePage from './components/GamePage';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Если localStorage пустой, отобразится Home */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute redirectTo="/about">
//               <Auth />
//             </ProtectedRoute>
//           }
//         />
//         {/* Если есть значение в localStorage, откроется About */}
//         <Route path="/about" element={<StartPage />} />
//         <Route path="/game" element={<GamePage />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Если localStorage пустой, отобразится Auth */}
        <Route
          path="/"
          element={
            <ProtectedRoute redirectTo="/about" isAuthOnly={false}>
              <Auth />
            </ProtectedRoute>
          }
        />

        {/* Если localStorage не пустой, откроется About */}
        <Route
          path="/about"
          element={
            <ProtectedRoute redirectTo="/" isAuthOnly={true}>
              <StartPage />
            </ProtectedRoute>
          }
        />

        {/* Если localStorage не пустой, откроется Game */}
        <Route
          path="/game"
          element={
            <ProtectedRoute redirectTo="/" isAuthOnly={true}>
              <GamePage />
            </ProtectedRoute>
          }
        />

        {/* Страница 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

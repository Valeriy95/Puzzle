import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectTo: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo, children }) => {
  const hasValue = !!localStorage.getItem('userData'); // Замените 'yourKey' на ваш ключ

  console.log(hasValue)
  return hasValue ? <Navigate to={redirectTo} /> : <>{children}</>;

  // Если данных нет, перенаправляем пользователя
//   if (!hasValue) {
//     return <Navigate to={redirectTo} />;
//   }

//   // Если данные есть, отображаем дочерний компонент
//   return <>{children}</>;
};

export default ProtectedRoute;

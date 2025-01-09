import React from 'react';
import { Navigate } from 'react-router-dom';

// interface ProtectedRouteProps {
//   redirectTo: string;
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo, children }) => {
//   const hasValue = !!localStorage.getItem('userData'); // Замените 'yourKey' на ваш ключ

//   console.log(hasValue)
//   return hasValue ? <Navigate to={redirectTo} /> : <>{children}</>;

// };

interface ProtectedRouteProps {
  redirectTo: string; // Куда перенаправлять при несоответствии
  isAuthOnly: boolean; // Требуется ли авторизация
  children: React.ReactNode; // Компонент для рендера
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo, isAuthOnly, children }) => {
  const hasValue = !!localStorage.getItem("userData"); // Проверка на наличие данных в localStorage

  // Если маршрут требует авторизации, но данных нет, перенаправляем на redirectTo
  if (isAuthOnly && !hasValue) {
    return <Navigate to={redirectTo} />;
  }

  // Если маршрут для неавторизованных, но данные есть, перенаправляем на redirectTo
  if (!isAuthOnly && hasValue) {
    return <Navigate to={redirectTo} />;
  }

  // Иначе рендерим переданный компонент
  return <>{children}</>;
};

export default ProtectedRoute;

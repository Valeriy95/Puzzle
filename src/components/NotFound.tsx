import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div>
        <h1>404 - Page Not Found</h1>;
        <p>Вы ввели некорректный адрес. Вернитесь на главную страницу:</p>
        <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        На главную
        </Link>
    </div>
  )
};

export default NotFound;

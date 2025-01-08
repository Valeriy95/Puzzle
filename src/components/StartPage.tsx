import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage: React.FC = () => {

    const navigate = useNavigate();

    function logout () {
        console.log('fdfsdfs')
        localStorage.clear();
        navigate('/');
    }

  return (
    <div>
        <nav>
            <li className='exit' onClick={logout}>Exit</li>
        </nav>
        <h1>Start Page</h1>
    </div>
    );
};

export default StartPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/startPage.scss';
import ConfirmExit from './ConfirmExit';

const StartPage: React.FC = () => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const logout = () => {
        setIsModalOpen(false);
        localStorage.clear();
        navigate("/");
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

  return (
    <div>
        <nav className='navigation'>
            <li className='exit' onClick={openModal}></li>
        </nav>
        <h1>Start Page</h1>
        {isModalOpen && <ConfirmExit onClose={closeModal} onLogout={logout}/>}
    </div>
    );
};

export default StartPage;
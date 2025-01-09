import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/startPage.scss';
import ConfirmExit from './ConfirmExit';

const StartPage: React.FC = () => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState<{ firstName: string; lastName: string } | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
    }, []);
      

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

    const goToGamePage = () => {
        navigate("/game");
    };


  return (
    <div>
        <nav className='navigation'>
            <li className='exit' onClick={openModal}></li>
        </nav>
        <div className='content-start-page'>
            <h1 className='title-start-page'>ENGLISH PUZZLE</h1>
            <p className='text-start-page'>English Puzzle is an interactive mini-game aimed at enhancing English language skills. Players assemble sentences from jumbled words. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.</p>
            {userData ? ( <p className='greeting-start-page'> Hello, {userData.firstName} {userData.lastName} ! </p>) : ( null )}
            <button className='start-btn' onClick={goToGamePage}>START</button>
        </div>
        {isModalOpen && <ConfirmExit onClose={closeModal} onLogout={logout}/>}
    </div>
    );
};

export default StartPage;
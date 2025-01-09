import React from 'react';
import '../styles/confirmExit.scss';

interface ConfirmExitProps {
    onClose: () => void;
    onLogout: () => void;
}

const ConfirmExit: React.FC<ConfirmExitProps> = ({ onClose, onLogout }) => {

  return (
    <div className='confirm-exit-window'>
        <div>
            <h2 className='title-confirm-exit'>Вы уверены, что хотите выйти?</h2>
            <div className='container-confirm-exit-btn'>
                <button className='confirm-exit-btn' onClick={onLogout}>Yes</button>
                <button className='confirm-exit-btn' onClick={onClose}>No</button>
            </div>
        </div>
    </div>
    );
};

export default ConfirmExit;
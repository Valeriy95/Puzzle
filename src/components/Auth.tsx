import React, { useState } from 'react';
import '../styles/auth.scss';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ fname?: string; lname?: string }>({});

  const validateInput = () => {
    const firstName = (document.querySelector("#fname") as HTMLInputElement).value.trim();
    const lastName = (document.querySelector("#lname") as HTMLInputElement).value.trim();

    let isValid = true;
    const newErrors: { fname?: string; lname?: string } = {};

    // Проверка имени
    if (!/^[A-Za-z-]+$/.test(firstName)) {
      newErrors.fname = "Имя должно содержать только буквы и символ дефиса.";
      isValid = false;
    } else if (firstName.length < 3) {
      newErrors.fname = "Имя должно быть не короче 3 символов.";
      isValid = false;
    } else if (!/^[A-Z]/.test(firstName)) {
      newErrors.fname = "Имя должно начинаться с заглавной буквы.";
      isValid = false;
    }

    // Проверка фамилии
    if (!/^[A-Za-z-]+$/.test(lastName)) {
      newErrors.lname = "Фамилия должна содержать только буквы и символ дефиса.";
      isValid = false;
    } else if (lastName.length < 4) {
      newErrors.lname = "Фамилия должна быть не короче 4 символов.";
      isValid = false;
    } else if (!/^[A-Z]/.test(lastName)) {
      newErrors.lname = "Фамилия должна начинаться с заглавной буквы.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const sendData = (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

    if (validateInput()) {
      const firstName = (document.querySelector("#fname") as HTMLInputElement).value.trim();
      const lastName = (document.querySelector("#lname") as HTMLInputElement).value.trim();
      localStorage.setItem("userData", JSON.stringify({ firstName, lastName }));
      
      navigate('/about')

    } else {
      console.log("Ошибка валидации.");
    }
  };

  return (
    <div>
          <form className='data-content' onSubmit={sendData}>
            <label className='title-label' htmlFor="fname">First name:</label>
            <input type="text" id="fname" name="fname" />
            {errors.fname && <p className='error'>{errors.fname}</p>}
            <label className='title-label' htmlFor="lname">Last name:</label>
            <input type="text" id="lname" name="lname" />
            {errors.lname && <p className='error'>{errors.lname}</p>}
            <input className='submit-btn' type="submit" value="Submit" />
          </form>
    </div>
    )
};

export default Auth;

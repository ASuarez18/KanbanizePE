import React, { useState } from "react";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";
import '../design/Login.css'
import imagenes from "../components/imagenes";
import { useTranslation } from 'react-i18next';
import i18n from '../components/i18n'


export const Login = (props) => {
    //Const y funcion para que sirva el cambio de idioma 
    const { t } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
    

    function handleLanguageChange() {
        const newLanguage = language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    }

    //Const para el los cambios de estado del switch
    const [checked, setChecked] = useState(language === 'es');
    const handleChange = nextChecked => {
      setChecked(nextChecked);
      handleLanguageChange();
      
    };

    //Const para fetch y llamada de la api para el login
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            email: email,
            pass: pass
        };
        console.log(values);

        const response = await fetch(`https://8e7469xqji.execute-api.us-east-1.amazonaws.com/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

        const data = await response.json();

        if (data.response === 'Invalid email or password.') {
            setModalShow(true);
        }
        else {
            localStorage.setItem('apikey', data.apikey);
            navigate('/home');
        }

        console.log(data);
        
    }
   
    return (
        <div className="login-container">
            <h1 className="h01">{t('Welcome to')}</h1>
            <img className="img04" src={imagenes.img2}/>
            <form className="login-form" onSubmit={handleSubmit}>

                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t('Email')} id="email" name="email" />
                <p></p>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder={t('Password')} id="pass" name="pass" />
                <p></p>
                <button type="submit">{t('Login')}</button>

                <div className="example">
                <p></p>
                <h2>{t('Language')}</h2>
                <label>
                    <span>{t('English')}</span>
                    <Switch
                        onChange={handleChange} 
                        checked={checked}
                        className="react-switch"
                    />
                    <span> {t('Spanish')}</span>
                </label>
                </div>
            </form>
            <ErrorModal show={modalShow} title={'ERROR'} message= {t('Incorrect username or password, in case of recovering the password you can consult it with Kanbanize')} onHide={() => setModalShow(false)} />
        </div>
    )
    
}

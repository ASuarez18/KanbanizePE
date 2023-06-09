import React, { useState } from "react";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";
import '../styles/Login.css'
import imagenes from "../components/imagenes";
import { useTranslation } from 'react-i18next';
import i18n from '../components/i18n'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faUser, faLock, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import { dom } from "aria-query";

export const Login = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [checked, setChecked] = useState(language === 'es');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [dom, setDom] = useState('');
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  function handleLanguageChange() {
    const newLanguage = language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  }

  const handleChange = nextChecked => {
    setChecked(nextChecked);
    handleLanguageChange();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      email: email,
      pass: pass,
      dom: dom
    };

    const response = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    const data = await response.json();

    if (data.response === 'Invalid email or password.') {
      setModalShow(true);
      console.log(values);
    } else {
      localStorage.setItem('apikey', data.apikey);
      localStorage.setItem('dominioid', dom);
      navigate('/home');
    }
  }

  return (
    <div className="overlay my-auto">
      <div class="centered-form">
        <div class="login-content">
          <form onSubmit={handleSubmit}>
            <img className="img04" src={imagenes.img4} style={{ maxWidth: '100%', height: 'auto' }}/>
            <h1 className="h01">{t('Welcome')}</h1>
            <div className="input-div one">
              <div className="i">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="div">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t('Email')} id="email" name="email" />
                <p></p>
              </div>
            </div>
            <div className="input-div pass">
              <div className="i"> 
                <FontAwesomeIcon icon={faLock} />
              </div>
              <div className="div">
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder={t('Password')} id="pass" name="pass" />
                <p></p>
              </div>
            </div>
            <div className="input-div dom">
              <div className="i"> 
                <FontAwesomeIcon icon={faInfoCircle} />
                <FontAwesomeIcon icon={faLock} />
              </div>
              <div className="div">
                <input value={dom} onChange={(e) => setDom(e.target.value)} type="text" placeholder={t('Domain')} id="dom" name="dom" />
                <p></p>
              </div>
            </div>
            <button type="submit" className="btn" style={{ borderRadius: "15px" }}>{t('Login')}</button>
            <div className="example">
              <p></p>
              <h3>{t('Language')}</h3>
              <label>
                <span>{t('English')}</span>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  className="react-switch"
                />
                <span> {t('Spanish')}</span>
              </label>
            </div>
          </form>
        </div>
      </div>
      <ErrorModal show={modalShow} title={'ERROR'} message={t('Incorrect username or password, in case of recovering the password you can consult it with Kanbanize')} onHide={() => setModalShow(false)} />
    </div>
  );
}

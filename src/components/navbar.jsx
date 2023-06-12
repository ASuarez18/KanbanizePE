import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useNavigate } from 'react-router-dom';
import logito from '../components/assets/img/images.png';

function MyNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  function handleLogout() {
    localStorage.removeItem('apikey');
    localStorage.removeItem('dominioid');
    navigate("/", { replace: true });
  }

  function handleLogoClick() {
    navigate("/home");
  }

  return (
    <div style={{ marginTop: "70px", display: 'flex' }}>
      {/* Margen superior para desplazar los elementos */}
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect fixed="top">
        <Navbar.Brand onClick={handleLogoClick}>
          <img
            src={logito}
            alt="My logo"
            width="45"
            height="45"
            className="d-inline-block align-top"
            style={{ padding: "5px", cursor: "pointer" }}
          />
          <span style={{ color: "white", fontSize: "25px", marginLeft: "5px" }}>KANBANIZE PE</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto justify-content-center">
            <NavDropdown title={t('Language')} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => changeLanguage('es')}>{t('Spanish')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('en')}>{t('English')}</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleLogout}>{t('Log out')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;

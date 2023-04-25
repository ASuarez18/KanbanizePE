import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {
    const { t } = useTranslation();
    const navigate = useNavigate();

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);

  }
  function handleLogout() {
    localStorage.removeItem('apikey');
    navigate("/", { replace: true });
    }

  return (
    <Navbar bg="light" expand="lg" collapseOnSelect fixed="top">
      <Navbar.Brand href=" ">KANBANIZE PE</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="barkanba">
            <Nav.Link onClick={handleLogout}>{t('Log out')}</Nav.Link>
            <NavDropdown title={t('Language')} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => changeLanguage('es')}>{t('Spanish')}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('en')}>{t('English')}</NavDropdown.Item>

          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;

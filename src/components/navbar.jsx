import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useNavigate } from 'react-router-dom';
import logito from '../components/assets/img/logito.png';

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

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect fixed="top">
      <Navbar.Brand href=" ">
        <img
          src={logito}
          alt="My logo"
          width="35"
          height="35"
          className="d-inline-block align-top"
          style={{ padding: "5px" }}
        />
        KANBANIZE PE
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" >
          <NavDropdown title={t('Language')} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => changeLanguage('es')}>{t('Spanish')}</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage('en')}>{t('English')}</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={handleLogout}>{t('Log out')}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;

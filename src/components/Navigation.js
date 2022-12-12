import { Container, Nav, Navbar } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom";
import logo from '../Light-Background.png';
import '../styles/Header.scss'

const Navigation = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand >
          <Link to={'/'} className='header-logo'>
          <Image src={logo} style={{height: '2.2rem'}}></Image> React Demo
          </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link><Link to="/">Premium Components</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
  </Navbar>
  );
}

export default Navigation;
import React from 'react';

import {Link} from 'react-router-dom';

///Bootstrap
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
///Bootstrap

//Font Awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faUser, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
//Font Awesome

const NavbarMenu = (props) => {

  // const gotoRoute = (event, routeName) => {
  //   event.preventDefault();
  //   <Redirect to={routeName} />
  // }

  return (<React.Fragment>
    <Container fluid="fluid">
      <Navbar bg="light" expand="lg">
        <Link className="navbar-brand" to="/">Social</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome}/></Link>
            <Link className="nav-link" to="/logout"><FontAwesomeIcon icon={faSignOutAlt}/></Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    </Container>
  </React.Fragment>);
};

export default NavbarMenu;

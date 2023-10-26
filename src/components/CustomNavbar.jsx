// creiamo il componente Navbar a funzione

// questo è un import più conciso
// import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'

// questo è un import più efficiente
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const CustomNavbar = (props) => {
  // console.log('le props sono', props)

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">
          Epistaurant - {props.additionalText}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#features">Menu</Nav.Link>
            {/* <div class="nav-link">Menu</div> */}
            <Nav.Link href="#pricing">Prenotazioni</Nav.Link>
            <Nav.Link href="#pricing">Come raggiungerci</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar

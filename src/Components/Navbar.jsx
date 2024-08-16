import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link,useNavigate,useLocation} from "react-router-dom";

function NavBar() {
  const navigate=useNavigate();
  function logout(){
    localStorage.clear("user-info")
    navigate("/");
  }
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    
    <div>
        <Navbar className='navbar' data-bs-theme="dark">
        <Container>
          <Navbar.Brand >Pakistan Cricket Board</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link className={"nav-links" + (url === "/home" ?" active" : "")} to='/home'>Home</Link></Nav.Link>
            <Nav.Link><Link className={"nav-links" + (url === "/teams" ?" active" : "")} to="/teams">Teams</Link></Nav.Link>
            <Nav.Link><Link className={"nav-links" + (url === "/players" ?" active" : "")} to="/players">Players</Link></Nav.Link>
            <Nav.Link><Link className={"nav-links" + (url === "/umpires" ?" active" : "")} to="/umpires">Umpires</Link></Nav.Link>
            <Nav.Link><Link className={"nav-links" + (url === "/venue" ?" active" : "")} to="/venue">Venue</Link></Nav.Link>
            <Nav.Link><Link className={"nav-links" + (url === "/matches" ?" active" : "")} to="/matches">Matches</Link></Nav.Link>
            <Nav.Link><Link className={"nav-links" + (url === "/shop" ?" active" : "")} to="/shop">Shop</Link></Nav.Link>
          </Nav>

            <button onClick={logout} className='btn btn-danger m-6'>Logout</button>
        </Container>
      </Navbar>
      
    </div>
  )
}

export default NavBar

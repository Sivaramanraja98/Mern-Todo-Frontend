import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FcTodoList } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

function Header({ searchText, setSearchText }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar bg="body-tertiary" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          <FcTodoList size={30} /> <span className="ms-2">TODO APPLICATION</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarColor04" />
        <Navbar.Collapse id="navbarColor04">
          <Nav className="me-auto">
            {user && (
              <Nav.Link as={Link} to="/" className="nav-link active">
                <FaHome size={24} />
                <span className="ms-2">Home</span>
              </Nav.Link>
            )}
          </Nav>
          <Nav className="justify-content-center">
            {user && (
              <Form className="d-flex">
                <Form.Group className="mb-0 me-sm-2">
                  <Form.Label className="visually-hidden">Search</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <CiSearch size={24} />
                    </span>
                    <FormControl
                      type="text"
                      placeholder="Search"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </Form.Group>
              </Form>
            )}
          </Nav>
          <Nav>
            {!user ? (
              <>
                <Nav.Item className="me-2">
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item>
                <Button style={{ cursor: 'pointer' }} onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;

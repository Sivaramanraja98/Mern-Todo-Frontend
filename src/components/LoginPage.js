import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./partials/Header";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    try {
      const result = await login(form);
      setErrors({});
      if (result.status === 200 && result.data.status === 200) {
        toast.success("Login Successful");
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigate("/");
      } else if (result.status === 200 && result.data.status === 201) {
        setErrors(result.data.data);
        toast.error("Invalid username or password");
      } else if (result.status === 200 && result.data.status === 202) {
        toast.error(result.data.message);
      } else {
        toast.error("Error occurred while logging in");
      }
    } catch (error) {
      toast.error("Error occurred while logging in");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <Card border="primary" className="mt-4">
              <Card.Body>
                <Card.Title className="text-center">Login</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                      placeholder="Enter username"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.username && errors.username.msg}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      placeholder="Enter password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.password && errors.password.msg}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center">
                <span>Don't have an account?</span>{" "}
                <Link to="/register">Register here</Link>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

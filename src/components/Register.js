import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { register } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Header from "./partials/Header";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    try {
      const result = await register(form);
      setErrors({});
      if (result.status === 200) {
        if (result.data.status === 200) {
          localStorage.setItem("user", JSON.stringify(result.data.data));
          navigate("/login");
          toast.success(result.data.message);
        } else if (result.data.status === 201 || result.data.status === 202) {
          setErrors(result.data.data);
          toast.error(result.data.message);
        }
      } else {
        toast.error("Something went wrong, Please try again");
      }
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center mt-4">
          <div className="col-lg-6">
            <Card>
              <Card.Header className="h4 text-center">Register</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      placeholder="Enter Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.name && errors.name.msg}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                      placeholder="Enter Username"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.username && errors.username.msg}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder="Enter Email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.email && errors.email.msg}
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
                      placeholder="Enter Password"
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
                      Register
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center">
                <span>Already have an account?</span>{" "}
                <Link to="/login">login here</Link>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

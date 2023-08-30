


import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:4000/login`, credentials)
      .then((res) => {
        if (res.data.status === 'Success') {
          // Handle successful login, such as setting authentication state
          console.log('Login successful');
        } else {
          console.log('Login failed');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log in
        </Button>
        <Link to="/reg">Register</Link>
      </Form>
    </div>
  );
}

export default Login;

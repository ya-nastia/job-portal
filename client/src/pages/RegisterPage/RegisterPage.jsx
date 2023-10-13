import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.scss';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(name, email, password, lastName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">

      <form className="register-card card p-2" onSubmit={handleSubmit}>
        <h5 className='text-center mt-2'>Register</h5>

        <div className="mb-3">

          <label htmlFor="name" className="form-label">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        <div className="mb-3">

          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>

          <input
            type="text"
            className="form-control"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

        </div>

        <div className="mb-3">

          <label htmlFor="email" className="form-label">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="mb-3">

          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <div className="d-flex flex-column justify-content-between">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <p className='text-center mt-2'>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>

      </form>
    </div>
  )
}

export default RegisterPage;

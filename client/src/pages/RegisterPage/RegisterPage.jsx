import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.scss';
import InputFrom from '../../components/InputForm/InputForm';

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

        <InputFrom
            htmlFor="name"
            labelText={"Name"}
            type={"text"}
            value={name}
            handleChange={(e) => setName(e.target.value)}
            name="name"
          />
          <InputFrom
            htmlFor="lastName"
            labelText={"Last Name"}
            type={"text"}
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
            name="lastName"
          />
          <InputFrom
            htmlFor="email"
            labelText={"Email"}
            type={"email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <InputFrom
            htmlFor="password"
            labelText={"Password"}
            type={"password"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            name="password"
          />

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

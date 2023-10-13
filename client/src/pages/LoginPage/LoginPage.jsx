import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputFrom from '../../components/InputForm/InputForm';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">

      <form className="register-card card p-2" onSubmit={handleSubmit}>
        <h5 className='text-center mt-2'>Login</h5>

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
            Login
          </button>
          <p className='text-center mt-2'>
            Don't an account? <Link to="/register">Register</Link>
          </p>
        </div>

      </form>
    </div>
  )
}

export default LoginPage;

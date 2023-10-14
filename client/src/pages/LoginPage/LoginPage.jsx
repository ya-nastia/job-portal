import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../store/features/alertSlice';
import InputFrom from '../../components/InputForm/InputForm';
import Spinner from '../../components/Spinner/Spinner';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(showLoading());

      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        alert("Login Successfully");
        navigate("/dashboard");
      }

    } catch (error) {
      dispatch(hideLoading());
      alert("Invalid Credintials. Please try again!");
      console.log(error);
    }
  };

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
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
    </>
  )
}

export default LoginPage;

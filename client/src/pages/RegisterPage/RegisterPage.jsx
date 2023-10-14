import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { showLoading, hideLoading } from '../../store/features/alertSlice';
import InputFrom from '../../components/InputForm/InputForm';
import Spinner from '../../components/Spinner/Spinner';
import './RegisterPage.scss';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.alerts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("Please Provide All Fields");
      }

      dispatch(showLoading());

      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastName,
        email,
        password,
      });

      dispatch(hideLoading());

      if (data.success) {
        toast.success("Registered Successfully");
        navigate("/login");
      }

    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response.data.message || "Invalid Form Details. Please Try Again!");
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
    </>
  )
}

export default RegisterPage;

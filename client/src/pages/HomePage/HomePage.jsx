import React from "react";
import { Link } from 'react-router-dom';
import './HomePage.scss';

const HomePage = () => {
  return (
    <>
      <video autoPlay muted loop id="bg-video">
        <source src="/assets/videos/bg.mp4" type="video/mp4" />
      </video>

      <div className="content">
        <div className="card w-25">

          <div className="logo-container">
            <img src="/assets/images/logo.svg" alt="logo" className="m-3" />
          </div>

          <div className="card-body">

            <h5 className="card-title">No #1 Carrer Platform</h5>

            <hr />

            <p className="card-text">
              Search and manage your jobs with ease. Free and open source job
              portal.
            </p>

            <div className="d-flex justify-content-between mt-5">
              <p>
                You can register <Link to="/register">Here</Link>{" "}
              </p>
              <p>
                <Link to="/login" className="login-btn">
                  Login
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Loader from "../UI/Loader";
import { useDispatch } from "react-redux";
import {
  loginWithEmailAndPassword,
  signupWithEmailAndPassword,
} from "../../actions/auth";

const AuthIndex = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInput = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    return () => {
      setLoader(false);
      setDetails({
        email: "",
        password: "",
      });
    };
  }, []);

  const handleSubmission = (e) => {
    e.preventDefault();
    if (params.type === "signup" && details.password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000); // Clear error after 3 seconds
      return;
    }

    if (params.type === "signup" && !isValidEmail(details.email)) {
      setError("Invalid email format");
      setTimeout(() => {
        setError("");
      }, 3000); // Clear error after 3 seconds
      return;
    }

    if (params.type === "signup") {
      setLoader(true);
      dispatch(
        signupWithEmailAndPassword(details, (data) => {
          if (data.error) {
            console.log(data.error);
            alert("Some error occurred");
          } else {
            console.log("Successfully Signed up!");
            history.replace("/");
          }
          setLoader(false);
        })
      );
    } else if (params.type === "login") {
      setLoader(true);
      dispatch(
        loginWithEmailAndPassword(details, (data) => {
          if (data.error) {
            console.log(data.response);
            alert(
              data?.response?.data?.error?.message || "Some error occurred"
            );
          } else {
            console.log("Successfully Logged in!");
            history.replace("/");
          }
          setLoader(false);
        })
      );
    }
  };

  const isValidEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Fragment>
      <div className="auth-container">
        <div className="auth-container--box">
          <div className="tab-selector">
            <NavLink exact to={"/login"}>
              <h3>Login</h3>
            </NavLink>
            <NavLink exact to={"/signup"}>
              <h3>Signup</h3>
            </NavLink>
          </div>
          <form autoComplete={"off"} onSubmit={handleSubmission}>
            <div className="input-wrap">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={details.email}
                onChange={handleInput}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={details.password}
                onChange={handleInput}
              />
            </div>
            {params.type === "signup" && (
              <div className="input-wrap">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            {error && <div className="error">{error}</div>}
            <div className="button-wrap">
              <button className="login-btn">
                {params.type === "login" ? "Login" : "Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {loader && <Loader />}
    </Fragment>
  );
};

export default AuthIndex;

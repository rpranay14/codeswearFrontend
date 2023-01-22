import React, { Component, useEffect, useState, useRef } from "react";
import { baseUrl } from "../shared/baseUrl";

import { Label, Form, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { MdErrorOutline } from "react-icons/md";

function Login(props) {
  const userRef = useRef();
  const errRef = useRef();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errMsg, seterrMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser(email, password);
  };
  const handleCredentialResponse = (response) => {
    console.log(response);
    props.loginwithgoogle(response);
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "830331717159-iet0h9c00kj5q285bc8mbvrm3pbghun5.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt();
  }, []);
  const onSignIn = () => {
    console.log("LOGIN");
  };
  const handlegoogleloginfailure = () => {
    console.log("LOGIN FAIL");
  };
  useEffect(() => {
    seterrMsg("");
  }, [email, password]);

  useEffect(() => {
    if (props.errormsg) {
      seterrMsg(props.errormsg);
    }
  }, [props.errormsg]);

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [props.isAuthenticated]);

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <div className="flex  justify-center">
              <p className="mt-3 text-sm text-gray-600">
                or{" "}
                <Link to="/signup">
                  <span className="font-medium text-teal-600 hover:text-teal-500">
                    Sign up{" "}
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          ></p>
          <p
            className={
              errMsg
                ? "text-red-700 font-semibold flex items-center space-x-2"
                : "hidden"
            }
          >
            <MdErrorOutline />
            <span> {errMsg}</span>
          </p>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  ref={userRef}
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <Input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <Label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {" "}
                  Remember me{" "}
                </Label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  {" "}
                  Forgot your password?{" "}
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className=" mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </Form>
          <div id="buttonDiv"></div>
        </div>
      </div>
    </>
  );
}
export default Login;

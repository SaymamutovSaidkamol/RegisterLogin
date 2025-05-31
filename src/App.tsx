import React, { lazy } from "react";
import { Link, useRoutes } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const OTP = lazy(() => import("./pages/OTP"));
const Register = lazy(() => import("./pages/Register"));
const About = lazy(() => import("./pages/about"));

const App = () => {
  return (
    <>
    <Link to={"/"}>Home</Link>
    <Link to={"/otp"}>Rgister</Link>
    <Link to={"/about"}>About</Link>
      {useRoutes([
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/otp", element: <OTP /> },
        { path: "/about", element: <About /> },
      ])}
    </>
  );
};

export default React.memo(App);

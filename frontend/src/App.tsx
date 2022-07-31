import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { authSelectors } from "redux/slices/authSlice";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobPage from "./pages/job";
import UserPage from "pages/user";
import JobDetail from "pages/job/detail";
import UserForm from "pages/job/UserForm";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "components/NotFound";

const App: React.FC = () => {
  const currentUser = useSelector(authSelectors.currentUser);
  console.log(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !!localStorage.getItem("token") ? (
              <Navigate replace to="/jobs" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/"
          element={
            !!localStorage.getItem("token") ? (
              <Navigate replace to="/jobs" />
            ) : (
              <Register />
            )
          }
        />
        <Route path="/jobs" element={<JobPage />} />
        <Route
          path="/users"
          element={currentUser.role === "admin" ? <UserPage /> : <NotFound />}
        />
        <Route path="/job/create" element={<UserForm />} />
        <Route path="/job/update/:id" element={<UserForm />} />
        <Route path="/job/detail/:id" element={<JobDetail />} />
        <Route path="/*" element={<NotFound />} />;
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

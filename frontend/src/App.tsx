import React from "react";
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
import JobForm from "pages/job/JobForm";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "components/NotFound";
import { BasicLayout } from "pages/__layout/BasicLayout";

const App: React.FC = () => {
  const currentUser = useSelector(authSelectors.currentUser);

  return (
    <Router>
      <BasicLayout>
        {localStorage.getItem("token") ? (
          <Routes>
            <Route path="/login" element={<Navigate replace to="/jobs" />} />
            <Route path="/register" element={<Navigate replace to="/jobs" />} />
            <Route path="/" element={<Navigate replace to="/jobs" />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route
              path="/users"
              element={
                currentUser.role === "admin" ||
                currentUser.role === "client" ? (
                  <UserPage />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route path="/job/create" element={<JobForm />} />
            <Route path="/job/:id/edit" element={<JobForm />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Navigate replace to="/login" />} />
          </Routes>
        )}
        <ToastContainer />
      </BasicLayout>
    </Router>
  );
};

export default App;

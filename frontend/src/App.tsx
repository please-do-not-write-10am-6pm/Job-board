import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { Loader } from "components/Loading";

import { authSelectors } from "redux/slices/authSlice";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const BasicLayout = React.lazy(() => import("pages/__layout/BasicLayout"));
const Login = React.lazy(() => import("pages/auth/Login"));
const Register = React.lazy(() => import("pages/auth/Register"));
const JobPage = React.lazy(() => import("pages/job"));
const UserPage = React.lazy(() => import("pages/user"));
const JobDetail = React.lazy(() => import("pages/job/detail"));
const JobForm = React.lazy(() => import("pages/job/JobForm"));
const NotFound = React.lazy(() => import("components/NotFound"));

const App: React.FC = () => {
  const currentUser = useSelector(authSelectors.currentUser);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <BasicLayout>
          {currentUser.email ? (
            <Routes>
              <Route path="/login" element={<Navigate replace to="/jobs" />} />
              <Route
                path="/register"
                element={<Navigate replace to="/jobs" />}
              />
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
      </Suspense>
    </Router>
  );
};

export default App;

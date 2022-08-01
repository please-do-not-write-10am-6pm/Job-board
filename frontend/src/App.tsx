import React, { useEffect, Fragment } from "react";
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

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const checkValidToken = () => {
//     const token = localStorage.getItem("token");

//     // Validation logic...
//   };

//   return (
//     <Fragment>
//       {checkValidToken() ? (
//         <Route
//           {...rest}
//           render={(props) => <Component {...rest} {...props} />}
//         />
//       ) : (
//         <Redirect to="/auth?mode=login" />
//       )}
//     </Fragment>
//   );
// };

const App: React.FC = () => {
  const currentUser = useSelector(authSelectors.currentUser);

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
        <Route
          path="/jobs"
          element={
            !!localStorage.getItem("token") ? (
              <JobPage />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/users"
          element={
            localStorage.getItem("token") ? (
              currentUser.role === "admin" || currentUser.role === "client" ? (
                <UserPage />
              ) : (
                <NotFound />
              )
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/job/create"
          element={
            !!localStorage.getItem("token") ? (
              <UserForm />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/job/update/:id"
          element={
            !!localStorage.getItem("token") ? (
              <UserForm />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/job/detail/:id"
          element={
            !!localStorage.getItem("token") ? (
              <JobDetail />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/*" element={<NotFound />} />;
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

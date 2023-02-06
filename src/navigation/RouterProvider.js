import React from "react";
import routes from "./routes";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RouterProvider = () => {
  const token = useSelector((state) => state.user.token);
  
  return (
    <div>
      <Router>
        <Routes>
          {routes.filter((route)=>token || !route.isLoggedInRequired)
          .map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            );
          })}
          <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default RouterProvider;

import React from "react";
import Artist from "../components/Artist";
import ArtistUpdate from "../components/ArtistUpdate";
import Home from "../components/Home";
import Login from "../components/Login";

const routes = [
  {
    path: "/artist",
    component: <Home />,
    exact: true,
    isLoggedInRequired : true
  },
  {
    path: "/artist/add",
    component: <Artist />,
    exact: true,
    isLoggedInRequired : true

  },
  {
    path: "/",
    component: <Login />,
    exact: true,
  },
  {
    path: "/update/:id",
    component: <ArtistUpdate />,
    exact: true,
    isLoggedInRequired : true

  },
];

export default routes;

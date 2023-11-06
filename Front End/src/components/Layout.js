import React, { Fragment, useContext } from "react";
import NavBar from "./Navbar";
import { AppContext } from "../App";

import Routers from "./Routers";

const Layout = ({ isLoggedIn, isAdmin, userName }) => {
  const isLogged = useContext(AppContext);
  console.log(isLogged);
  return (
    <Fragment>
      <NavBar />
      <div>
        <Routers />
      </div>
    </Fragment>
  );
};

export default Layout;

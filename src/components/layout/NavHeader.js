import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/img/reckitt.svg";

import {
  FaBell,
  FaStickyNote,
  FaBars,
  FaTh,
  FaUserCircle,
} from "react-icons/fa";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import Logout from "../auth/Logout";
import { IoIosPerson } from "react-icons/io";
import { useOktaAuth } from "@okta/okta-react";
import Notifications from "../notifications/Notifications";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsData from "../notifications/Notifications";

const NavHeader = (props) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      setUserInfo(authState.idToken.claims);
      // You can also get user information from the `/userinfo` endpoint
      /*oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });*/
    }
  }, [authState, oktaAuth]);

  const menubar = () => {
    var sideBar = document.getElementById("mySidenav").style.width;
    if (sideBar === "") {
      document.getElementById("mySidenav").style.width = "300px";
      document.getElementById("main").style.marginLeft = "305px";
      $(".item_menuText").show();
      $(".sideNavMenu_grid").css("justify-content", "start");
      $(".sideNavMenu").css("overflow-y","auto")

    } else if (sideBar === "80px") {
      document.getElementById("mySidenav").style.width = "300px";
      document.getElementById("main").style.marginLeft = "305px";
      $(".item_menuText").show();
      $(".sideNavMenu_grid").css("justify-content", "start");
      $(".sideNavMenu").css("overflow-y","auto")

    } else {
      document.getElementById("mySidenav").style.width = "80px";
      document.getElementById("main").style.marginLeft = "85px";
      $(".item_menuText").hide();
      $(".sideNavMenu_grid").css("justify-content", "center");
      $(".sideNavMenu").css("overflow-y","hidden")
    }
  };

  const notifications = () => {
    const x = document.getElementById("NotificationsIdValues");
    console.log(x.style.display);
    if (x.style.display === "") {
      $("#NotificationsIdValues").toggle(0);
      $("#main").css("marginRight", "355px");
    } else if (x.style.display === "none") {
      $("#NotificationsIdValues").toggle();
      $("#main").css("marginRight", "355px");
    } else {
      $("#NotificationsIdValues").toggle();
      $("#main").css("marginRight", "6px");
    }
  };

  return (
    <>
      <Navbar
        style={{
          paddingLeft: "2.2rem",
          paddingRight: "2rem",
          justifyContent: "space-between",
        }}
        className="nav_bar navFlexbox"
        expand="lg"
        variant="light"
        fixed="top"
      >
        <div className="nav-items">
          <FaBars onClick={menubar} fontSize={24} color="#ff007f" cursor="pointer" />

          <Navbar.Brand
            style={{ background: "transparent !important" }}
            href="/"
          >
            <img
              src={Logo}
              width="80"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </div>

        <div style={{background:"transparent !important"}} className="nav-items">
         

          <div
            style={{
              display: "flex",
              gridGap: "20px",
              alignItems: "center",
              alignContent: "center",
            }}
            className="navItems"
          >
            <div
              style={{ display: "grid", textAlign: "center" }}
              className="item_bar profileDetails"
            >
              <div  style={{color:"#ff007f"}}> {userInfo?.name}</div>
              <div style={{color:"#ff007f"}}> {userInfo?.email}</div>
            </div>
            <FaUserCircle style={{color:"#ff007f"}} size={40} />
          </div>
        </div>
      </Navbar>
      <div id="NotificationsIdValues" className="notificationsCss">
        <Notifications />
      </div>
    </>
  );
};

export default NavHeader;

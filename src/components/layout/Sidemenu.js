import React, { useEffect, useRef, useState } from "react";
import {
  FaThLarge,
  FaDatabase,
  FaTelegram,
  FaCubes,
  FaUserCog,
  FaUserAlt,
  FaUsersCog,
  FaMinus,
  FaPlus,
  FaUsers,
  FaUserPlus,
  FaRegChartBar,
  FaAngleDown,
  FaAngleUp,
  FaCogs,
  FaRegFilePdf
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "../../assets/css/sidenav.css";
import $ from 'jquery'
import Logout from "../auth/Logout";

export default function SideMenu() {



   
  const getUrlData = () =>{
    const getURl = new URL(window.location.href);
   // const Idfetch = url.searchParams.get("admClientId");
  // console.log(getURl);
    const pathValue = getURl.pathname;
   // console.log(pathValue);
    if(pathValue === '/'){
      $("#MenuItmes_Overview").addClass("active")
      $(".getInfo").css("display","none !important")
    }
    
    
    
  
  }

  useEffect(() => {
    getUrlData()
  });

 
 

  return (
    <div>
      <div id="mySidenav" className="sideNav common_bg_color">
        <div className="sideNavMenu">
          <div className="sideNavMenu_grid">
            <div style={{ display: "grid", gridGap: "20px" }}>
              <Link to={"/"}>
                <div id="MenuItmes_Overview" style={{gridGap:"1rem"}} className="items_menu">
                  <div>
                    <FaRegFilePdf color="#ff007f" title="Generate Report" fontSize={28} />
                  </div>
                  <div className="item_menuText">Generate Report</div>
                </div>
              </Link>
         
            </div>

            <>
              <Logout/>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

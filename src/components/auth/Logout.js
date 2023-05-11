import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { FaSignOutAlt } from "react-icons/fa";
import Popup from "reactjs-popup";
import Waring from "../../assets/img/warning.png";

const contentStyle = {
  maxWidth: "400px",
  width: "100%",
  background:"white",
  borderRadius:"20px"
};
// Basic component with logout button
const Logout = () => { 
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    // Will redirect to Okta to end the session then redirect back to the configured `postLogoutRedirectUri`
    await oktaAuth.signOut();
  };

  return (
    <>
      

      <Popup
    trigger={<button style={{display:"contents",gridGap:"2rem !important",color:"#ff007f"}} className="items_menu logoutCss">
       <div  className="items_menu logoutCss">
        <div>
          <FaSignOutAlt color='#ff007f'  fontSize={28} />
        </div>
        <div style={{padding:"20px"}} className="item_menuText">
          Logout 
        </div>
      </div>
    </button>}
    modal
    contentStyle={contentStyle}
  >
    {close => (
      <div style={{ display: "contents",height:"auto",textAlign:"center",fontSize:"20px",padding:"1rem" }} className="modal">
        <a style={{right: "4px",top: "7px",textDecoration:"none",background:"transparent"}} className="close"  onClick={close}>
          &times;
        </a>
        <div style={{backgroundImage:"linear-gradient(243.04deg,#ff593d -1.66%,#ff007f 50.23%,#c41974 99.97%)"}}  className="header">
          <img width={64} src={Waring} alt="image"/>
          <div style={{textAlign:"center",color:"white",fontSize:"20px",fontWeight:"600",paddingTop:"5px"}}>WARNING</div>
          <div style={{height:"auto",textAlign:"center",fontSize:"16px",paddingTop:"10px",fontWeight:"normal" }}>
          Do you want to logout?
        </div>
        </div>
        <div style={{background:"white"}} className="actions">
          

          <button style={{margin:"5px 5px",background: "#0000a0",border: "none",borderRadius: "2px",color: "white",paddingTop: "4px",paddingBottom: "4px"}}
            className="button submit_btn"
            onClick={() => {
              console.log("Yes");
              logout();
            }}
          >
            Yes
          </button>

          <button style={{margin:"5px 5px",background: "#d1d3d5",border: "none",borderRadius: "2px",color: "white",paddingTop: "4px",paddingBottom: "4px"}}
            className="button submit_btn"
            onClick={() => {
              console.log("No");
              close();
            }}
          >
            No
          </button>
        </div>
      </div>
    )}
  </Popup>
    </>
  );
};

export default Logout;
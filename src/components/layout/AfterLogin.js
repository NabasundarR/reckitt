import React, { useEffect, useState } from 'react'
import { useOktaAuth } from "@okta/okta-react";
import preloadimg from '../../assets/img/preloader1.gif';

const AfterLogin = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [PageAuth, setPageAuth] = useState(false);
    const [PageLoading, setPageLoading] = useState(false);


    useEffect(() => {
        if (!authState || !authState.isAuthenticated) {
            setPageAuth(false);
        } else {
            setPageAuth(true);
        }
      }, [authState, oktaAuth]);

      //console.log(authState)

      const url = new URL(window.location.href);
     // console.log("URl");
      //console.log(url);


  return (
    <div>
      {!PageAuth && url.pathname === "/login/callback" && (
        <div style={{display:"grid",justifyContent:"center",textAlign:"center",alignContent:"center",alignItems:"center",height:"100vh"}} className="pageLoading">
          <img width={200} src={preloadimg} alt="image" />
          <div>Please wait...</div>
        </div>
      )}
    </div>
  );
}

export default AfterLogin

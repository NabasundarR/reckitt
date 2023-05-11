import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

const Getusers = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      if (!authState || !authState.isAuthenticated) {
        setUserInfo(null);
      } else {
		 console.log("User Login Success");		 
        setUserInfo(authState.idToken.claims);
      }
    }, [authState, oktaAuth]);

    

  //console.log(isSession)

  return (
    <div style={{display:"grid",gridGap:"5px"}}>
        <span style={{color:"#ff007f"}} className='userinfo'>{userInfo?.name}</span>
        <span style={{color:"#ff007f"}}  className='WelcomeBack'>Welcome Back</span>
    </div>
  )
}

export default Getusers

import React, { Component } from "react";
import { withOktaAuth } from "@okta/okta-react";
import bgimage from "../../assets/img/reckitt.png";
import logo from "../../assets/img/reckitt.svg";
import GenerateReport from "../pages/GenerateReport";
import "bootstrap/dist/css/bootstrap.min.css";


export default withOktaAuth(
  class SigninWidget extends Component {
    constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

    async login() {
      await this.props.oktaAuth.signInWithRedirect();
    }

    async logout() {
      await this.props.oktaAuth.signOut();
    }

    render() {
      let body = null;
      if (this.props.authState?.isAuthenticated) {
        body = (
          <div className="Buttons">
            <GenerateReport/>
          </div>
        );
      } else {
        body = (
          <div className="Buttons">
            <div className="loginPage">
              <div className="login_body_content">
                <div className="bg-white dark:bg-gray-900 bgColor">
                  <div className="login_body_grid">
                    <div style={{ backgroundImage: `url(${bgimage})`}} className="hidden bg-cover lg:block lg:w-2/3 login_bg_image">
                      <div className="login_info">
                        <div>

                       

                          <h2 className="text-4xl font-bold text-white">
                              {process.env.REACT_APP_NAME}
                          </h2>

                          <p className="left_grid_text">
                              Welcome to the reckitt Invoicing Portal application. Access to this system is limited - please contact <a target={"_blank"} style={{color:"black"}} href="mailto:admin@aaysinsight.com"><mark>admin@aaysinsight.com</mark></a> for details.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="right_grid_align bgColor">
                      <div className="flex-1">
                        <div className="text-center">
                          <span className="text-4xl font-bold text-center text-gray-700 dark:text-white MarsLogo">
                            <img width={120} src={logo} alt="img" />
                          </span>

                          <p className="left_grid_text left_margin loginText1">
                            Sign in to access your account
                          </p>
                        </div>

                        <div className="mt-8">
                          <div className="mt-6">
                            <button 
                              className="btn_login"
                              onClick={this.login}>
                              Sign in
                            </button>
                          </div>
                        </div>

                      <div style={{width:"70%",paddingTop:"1rem",display:"block",margin:"auto"}}>
                        <span id="Login_herf"  style={{color:"white",display:"flex",justifyContent:"space-between"}}>
                          <a  target={"_blank"} className="loginText1" style={{color:"white",textDecoration:"none"}} href="mailto:admin@aaysinsight.com?subject=Need Access to the Lab Analytics BI Portal - Pilot Applications!"> Need Access?</a>

                          <a  target={"_blank"} className="loginText1" style={{color:"white",textDecoration:"none"}} href="mailto:admin@aaysinsight.com?subject=Need Help On Sign in On Lab Analytics BI Portal - Pilot Applications!"> Need Help?</a>
                          </span>
                      </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return <div className="App">{body}</div>;
    }
  }
);

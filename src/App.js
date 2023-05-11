import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security, SecureRoute } from '@okta/okta-react';
import SigninWidget from './components/auth/SigninWidget';
import AfterLogin from './components/layout/AfterLogin';
import GenerateReport from './components/pages/GenerateReport';
import Preview from './components/pages/Preview';


const oktaAuth = new OktaAuth({
  issuer: `${process.env.REACT_APP_OKTA_ISSUER}`,
  clientId: `${process.env.REACT_APP_OKTA_CLIENT_ID}`,
  redirectUri: window.location.origin + '/login/callback'
});

class App extends Component {

  constructor(props) {
    super(props);
    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      props.history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };
  }

  render() {
    return (
      <Security oktaAuth={oktaAuth} restoreOriginalUri={this.restoreOriginalUri}>
        <Route path="/" exact={true} component={SigninWidget}/>
        <Route path="/login/callback" component={LoginCallback}/>
        <SecureRoute path="/ReportGenerate" exact={true} component={GenerateReport}/>
        <SecureRoute path="/Preview" exact={true} component={Preview}/>

        <Route path='*' component={AfterLogin} />
      </Security>
    );
  }
}

const AppWithRouterAccess = withRouter(App);

class RouterApp extends Component {
  render() {
    return (<Router><AppWithRouterAccess/></Router>);
  }
}

export default RouterApp;

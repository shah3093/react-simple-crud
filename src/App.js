import React, {Suspense, useEffect} from 'react';

import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

///Bootstrap
import {Spinner} from "react-bootstrap";
///Bootstrap

import * as actions from './store/actions/auth';

import 'bootstrap/dist/css/bootstrap.min.css';

const Auth = React.lazy(() => {
  return import ('./container/auth/auth');
});

const Home = React.lazy(() => {
  return import ('./container/home/index');
});
const Logout = React.lazy(() => {
  return import ('./container/auth/logout/logout');
});

const App = (props) =>{

  const {onTryAutoSignup} = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (<Switch>
    <Route path="/auth" exact render={props => <Auth {...props}/>}/>
    <Redirect to="/auth"/>
  </Switch>);

  if (props.isAuthenticated) {
    routes = (<Switch>
      <Route path="/" exact render={props => <Home {...props}/>}/>
      <Route path="/logout" exact render={props => <Logout {...props}/>}/>
      <Redirect to="/"/>
    </Switch>);
  }

  return (<React.Fragment>
    <Suspense fallback={<Spinner animation="border" />}>{routes}</Suspense>
  </React.Fragment>);
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

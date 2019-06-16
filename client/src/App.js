import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import './App.css';
import PrivateRoute from './component/common/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authAction';
import {clearCurrentProfile} from './actions/profileAction';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import { Provider } from "react-redux";
import store from './store';
import CreateProfile from './component/create-profile/CreateProfile';
import Dashboard from './component/dashboard/Dashboard';
// check for token
if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded =jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
 // check for expired token
 const currentTime=Date.now()/1000;
 if(decoded.exp < currentTime){
   // Logout user
   store.dispatch(logoutUser);
   // clear current profile
   store.dispatch(clearCurrentProfile);
   // redirect to login
   window.location.href='/login';
 }

}

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

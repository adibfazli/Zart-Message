import "./App.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import userService from "../../services/uaerService";
import MessageFeed from "../../components/MessageFeed/MessageFeed";
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
    };
  }
  
  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" render={() => 
            <NavBar user={this.state.user} />}
          />
          <Route exact path="/message" render={() => 
            <MessageFeed />} 
          />
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
        </Switch>
      </>
    );
  }
}

export default App;

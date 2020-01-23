import "./App.css";
import React, { Component } from "react";
import { Route, Switch , Redirect} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import userService from "../../services/uaerService";
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import EditUserPage from '../EditUser/EditUser'
import ChatRooms from '../../components/ChatRooms/ChatRooms'
import Chat from '../../components/Chat/Chat'
// import socket from '../../socket';

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
  
  componentDidMount () {
    
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" render={() => 
            <>
                <NavBar 
                  user={this.state.user} 
                  handleLogout={this.handleLogout}
                />
                {userService.getUser() ?
              <div className='chatroom-chat'>
                <ChatRooms />
                <Chat />
              </div>
              :
              <Redirect to='/login' />
                }
            </>
          } />
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
          <Route exact path='/editUser' render={({ history }) => 
            <EditUserPage
              history={history}
            />
          }/>
        </Switch>
      </>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {Route ,Switch} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import './App.css';

class App extends Component {
  render(){
    return (
      <>
        <Switch>
          
          <Route exact path='/' render={() =>
  
            <NavBar />
  
          }/>
  
        </Switch>
      </>
    );
  }
}

export default App;

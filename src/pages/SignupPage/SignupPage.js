import React, { Component } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css';
import logo from '../../image/zartLogo.png'

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <div className='SignupPage'>
        <img src={logo} className='logo'/>
        <SignupForm {...this.props} updateMessage={this.updateMessage} />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default SignupPage;
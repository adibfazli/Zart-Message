import React, { Component } from 'react';
import userService from "../../services/uaerService";

class EditUser extends Component {
    state = {
        name: ""
      }
    handleClick = (e) => {
        e.preventDefault()
        console.log(e)
        userService.editUserName(this.state);
    }
    handleChange = (e) => {
        console.log(e)
        console.log([e.target.name])
        console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount() {
        console.log('component did mount')
        var asghar = userService.showUser();
        console.log("asghar: ", asghar)
    }
    componentDidCatch() {
        console.log('component did catch')
    }
    componentDidUpdate() {
        console.log('component did update')
    }
    // componentWillMount() {
    //     console.log('component will mount')
        
    // }
    // componentWillUpdate() {
    //     console.log('component will update')
    // }
    render() { 
        console.log("render")
        return ( 
        <div>
            edit user name
            <form onSubmit={this.handleClick}>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                <button >submit</button>
            </form>

        </div>);
    }
}
 
export default EditUser;
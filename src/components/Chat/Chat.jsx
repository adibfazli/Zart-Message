import React from "react";
import styles from "./Chat.module.css";
import socket from '../../socket';
import service from "../../services/uaerService";
// import {Link} from 'react-router-dom'


class Chat extends React.Component {

    state = {
        content: [],
        chatBox: ''
    }
    handleClick = (e) => {
        e.preventDefault();
        let content = this.state.content;
        content.push({
            user: service.getUser(),
            message: this.state.chatBox
        })
        socket.submitClicked(content)
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount() {
        socket.registerApp(this);
    }

    render () {
        return (
        <div className={styles.chat}>
            <div className={styles.chatInfo}>info</div>
            <div className={styles.MessageFeed}>
            <p>MessageFeed</p>
            {this.state.content ? 
                <ul>
                    {this.state.content.map (c => 
                        <li>
                            {c.user.name}:&nbsp;{c.message}
                        </li>
                    )}
                </ul>    
                : <p>nothing in there</p>
        }
            </div>
            <form onSubmit={this.handleClick}>
                <input type="text" name="chatBox" value={this.state.name} onChange={this.handleChange}/>
                <button type='submit' >submit</button>
            </form>
        </div>
        );
    };

}
export default Chat;

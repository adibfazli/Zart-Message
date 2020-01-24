import React from "react";
import styles from "./Chat.module.css";
import socket from '../../socket';
import service from "../../services/uaerService";
import uaerService from "../../services/uaerService";
import tokenService from "../../services/tokenService";
// import {Link} from 'react-router-dom'


class Chat extends React.Component {

    state = {
        messages: [],
        chatBox: '',
    }
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    //                    handle > Click <
    handleSendMessage = (e) => {
        e.preventDefault();
        const obj = {
            content: this.state.chatBox,
            userName: uaerService.getUser().name,
            user: uaerService.getUser(),
            chatId: this.props.chat._id
        }
        socket.handleSendMessages(obj);
        this.setState({chatBox: ''});
    }

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    //                      handle > Change <
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    //                   componant Functions
    componentDidMount() {
        socket.registerApp(this);
        this.setState({messages: this.props.chat.messages});
    }
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    //                         render
    render () {
        return (
        <div className={styles.chat}>
            <div className={styles.chatInfo}>info</div>
            <div className={styles.MessageFeed}>
            <p>MessageFeed</p>
            <button onClick={()=>this.props.handleUpdateChat(null)}>X</button>
            <div className={styles.chatFeed}>
                {this.state.messages ? 
                    <ul>
                        {this.state.messages.map (message => 
                            message.userName == uaerService.getUser().name ?
                            <li className ={styles.greenChat} key={message._id}> <span className={styles.username}>{message.userName}:</span>&nbsp;<span>{message.content}</span> </li>
                            : 
                            <li className ={styles.whiteChat}Chat key={message._id} > <span className={styles.username}>{message.userName}:</span>&nbsp;<span>{message.content}</span> </li>
                        )}
                    </ul>    
                    : <p>nothing in there</p>
                }
            </div>
            </div>
            <form onSubmit={this.handleSendMessage} className={styles.sendForm}>
                <input type="text" autoComplete="off" name="chatBox" value={this.state.chatBox} onChange={this.handleChange} className={styles.messageInput}/>
                <button type='submit' className={styles.sendBtn}>submit</button>
            </form>
        </div>
        );
    };

}
export default Chat;

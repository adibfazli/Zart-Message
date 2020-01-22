import React, { Component } from 'react'
import styles from './ChatRooms.module.css'
import service from "../../services/uaerService";
import ChatService from '../../services/chatService'
import socket from '../../socket';
// import {Link} from 'react-router-dom'


class ChatRooms extends Component{
    state = {
        user: service.getUser(),
        search: '',
        latestChat: null,
        chatsId: [],
        clickedChat : null
    }
    
    //////////////////////////////////
    //           handle Change

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    //           handle Submit
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({search: this.state.search})
        await socket.searchUser(this.state)
    }

    handleChatClick = (e) =>{
        

    }

    //////////////////////////////////

    componentDidMount = async() => {
        socket.registerChatrooms(this);
        // console.log("here : ",await  ChatService.getAllChats(this.state.user))
        const latestChat = await ChatService.getAllChats(this.state.user)
        this.setState({latestChat: latestChat})
    }

    render(){
        return(
            <div className={styles.chatroom}>
                <div className={styles.search}>

                    <form onSubmit={this.handleSubmit} >
                        <input type="text" placeholder='search' name='search' value={this.state.name} onChange={this.handleChange} />
                        <button type='submit'>search</button>
                    </form>

                </div>
                <div className={styles.chatRooms}>
                    {this.state.latestChat ?
                        <ul>
                        {/* {this.state.latestChat.map(e => {
                            return (<li>
                                <button onClick={this.handleChatClick} value={Object.values(e)[0]} > This is ID: {Object.keys(e)[0]} </button>
                            </li>)
                        })} */}
                    </ul>
                    : <p>nothing in here</p>
                    }
                </div>
            </div>
        )
    }
}
export default ChatRooms;
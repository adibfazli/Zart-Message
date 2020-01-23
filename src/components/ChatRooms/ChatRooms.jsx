import React, { Component } from 'react'
import styles from './ChatRooms.module.css'
import service from "../../services/uaerService";
import ChatService from '../../services/chatService'
import socket from '../../socket';
import chatService from '../../services/chatService';
// import {Link} from 'react-router-dom'


class ChatRooms extends Component{
    state = {
        user: service.getUser(),
        search: '',
        latestChat: null,
        chatsId: [],
        clickedChatId : null
    }
    
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    //                     handle Change

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    
    handleChatClick = async (e) =>{
        this.setState({clickedChatId : e.target.value})
        this.findClickedChat()
    }
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    //                     handle Submit
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({search: this.state.search})
        await socket.searchUser(this.state)
    }
    findClickedChat = async (e) =>{
        this.state.chatsId =  [this.state.clickedChatId]
        console.log("chat clicked : " ,this.state.chatsId )
        await chatService.findClickedChat(this.state.chatsId)
    }

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

    componentDidMount = async() => {
        socket.registerChatrooms(this);
        // console.log("here : ",await  ChatService.getAllChats(this.state.user))
        const latestChat = await ChatService.getAllChats(this.state.user)
        this.setState({latestChat: latestChat})
    }

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    //                         render
    render(){
        return(
            <div className={styles.chatroom}>
                <div className={styles.search}>

                    <form onSubmit={this.handleSubmit} className={styles.searchForm} >
                        <input type="text" placeholder='search' className={styles.searchInput} name='search' value={this.state.name} onChange={this.handleChange} />
                        <button type='submit' className={styles.searchBtn}>&#128269;</button>
                    </form>

                </div>
                <div className={styles.chats}>
                    {this.state.latestChat ?
                        <ul>
                            {this.state.latestChat.map(e => {
                                return (
                                <li>
                                    <button onClick={this.handleChatClick} value={Object.values(e)[0]} >{Object.keys(e)[0]} </button>
                                </li>)
                            })}
                        </ul>
                    : <p>nothing in here</p>
                    }
                </div>

            </div>
        )
    }
}
export default ChatRooms;
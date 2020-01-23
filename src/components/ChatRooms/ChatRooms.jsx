import React, { Component } from 'react'
import styles from './ChatRooms.module.css'
import service from "../../services/uaerService";
import ChatService from '../../services/chatService'
import socket from '../../socket';
import chatService from '../../services/chatService';
import uaerService from '../../services/uaerService';
// import {Link} from 'react-router-dom'


class ChatRooms extends Component{
    state = {
        user: service.getUser(),
        search: '',
        latestChats: null,
        chatsId: [],
        clickedChatId : null,
        foundUser: null
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
    handleSearchUsername = async (e) => {
        e.preventDefault();
        this.setState({search: this.state.search})
        const foundUser = await uaerService.searchUser(this.state.search);
        this.setState({foundUser})
    }
    handleOpenFoundChatroom = async (userId) => {
        console.log(userId)
        const foundChat = await chatService.findChat(userId);
        this.props.handleUpdateChat(foundChat);
    }
    findClickedChat = async (e) =>{
        this.state.chatsId =  [this.state.clickedChatId]
        console.log("chat clicked : " ,this.state.chatsId )
        await chatService.findClickedChat(this.state.chatsId)
    }

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

    componentDidMount = async() => {
        socket.registerChatrooms(this);
        socket.getLatestChats({userId: uaerService.getUser()._id});
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

                    <form onSubmit={this.handleSearchUsername} className={styles.searchForm} >
                        <input type="number" placeholder='search' className={styles.searchInput} name='search' value={this.state.name} onChange={this.handleChange} />
                        <button type='submit' className={styles.searchBtn}>&#128269;</button>
                    </form>
                    {this.state.foundUser ? <button onClick={() => this.handleOpenFoundChatroom(this.state.foundUser._id)}>{this.state.foundUser.name}</button> : <p>gg</p>}
                </div>
                <div className={styles.chats}>
                    {this.state.latestChats ?
                        <ul>
                            {this.state.latestChats.map(e => {
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
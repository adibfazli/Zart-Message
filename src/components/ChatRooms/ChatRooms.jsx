import React from 'react'
import styles from './ChatRooms.module.css'
// import {Link} from 'react-router-dom'


const ChatRooms = (props) => {
    return(
        <div className={styles.chatroom}>
            <div className={styles.search}>
            <input type="text" placeholder='search' /><button>search</button>
            </div>
            <div className={styles.chatRooms}></div>
        </div>
    )
}
export default ChatRooms;
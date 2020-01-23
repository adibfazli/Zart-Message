import tokenService from'./tokenService';
import chat from '../components/Chat/Chat'

const BASE_URL = '/api/chats/';


export default {
    getAllChats,
    findClickedChat,
    findChat,
};

async function findChat(userId) {
    return await fetch (BASE_URL + 'findChat/userId/' + userId, {
        method: 'GET',
        headers: {Authorization: 'Bearer ' + tokenService.getToken()}
    }).then(async res => await res.json())
}

async function getAllChats(user){
    return await fetch (BASE_URL + 'allChats', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(user)
        }).then(res => {
            return res.json()
        }).then(data => {
            return data
        })
}

function findClickedChat(id){
    // console.log(id)
    return fetch (BASE_URL + 'chatSelected',{
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(id)
    }).then(res => {
        return res.json()
    }).then(data => {
         chat.messageReciver(data)
    })
}

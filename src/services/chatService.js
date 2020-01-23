// import tokenService from'./tokenService';
import chat from '../components/Chat/Chat'
const BASE_URL = '/api/users/';

export default {
    getAllChats,
    findClickedChat,

};

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

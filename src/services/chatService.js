import tokenService from'./tokenService';
const BASE_URL = '/api/users/';

export default {
    getAllChats,
    // findClickedChat,

};

function getAllChats(user){
    return fetch (BASE_URL + 'allChats', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json', 'Accept' : 'application/json'}),
        body: JSON.stringify(user)
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data, "THIS IS DATA!!!!")
        })
}

function findClickedChat(){

}

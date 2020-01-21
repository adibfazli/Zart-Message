import tokenService from './services/tokenService';
const socket = window.io();
let chatPage = null;
let chatroomsPage = null;



function registerApp(app) {
    chatPage = app;
}
function registerChatrooms(app){
    chatroomsPage = app
}
//-----------------------------------------------------
function sendClicked(content) {
    const token = tokenService.getToken();
    socket.emit('click-submit', content)
}
socket.on ('click-submit', function(content) {
    console.log("inside chat page handle click ")
    console.log(content)
    chatPage.setState({content: content})
});

//----------- search-user-start-chat -----------------
function searchUser (phoneNum){
    const token = tokenService.getToken();
    socket.emit('search-user-start-chat',phoneNum , token)
}
socket.on('search-user-start-chat' , function(chat){
    chatroomsPage.setState({latestChat: chat})
});

//---------------------------------------------------

export default {
    registerApp,
    sendClicked,
    searchUser,
    registerChatrooms,
}
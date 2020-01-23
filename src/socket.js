import tokenService from './services/tokenService';
const socket = window.io();
let chatPage = null;
let chatroomPage = null;

function handleSendMessages({content, userName, user, chatId}) {
    const token = tokenService.getToken();
    socket.emit('send-message', {content, userName, user, chatId, token})
}
socket.on('send-message', function(chat){
    chatPage.setState({messages: chat.messages});
})

function registerApp(app) {
    chatPage = app;
}

function getLatestChats({userId}) {
    const token = tokenService.getToken();
    socket.emit('get-user', {userId, token})
}

socket.on('get-user', function(user) {
    chatroomPage.setState({latestChats: user.chats});
})








function registerChatrooms(app){
    chatroomPage = app
}
//------------------------click-submit----------------
// function sendClicked(content) {
//     // const token = tokenService.getToken();
//     socket.emit('click-submit', content)
// }
// socket.on ('click-submit', function(content) {
//     console.log("inside chat page handle click ")
//     console.log(content)
//     chatPage.setState({content: content})
// });

// //----------- search-user-start-chat -----------------
// function searchUser (phoneNum){
//     const token = tokenService.getToken();
//     socket.emit('search-user-start-chat',phoneNum , token)
// }
// socket.on('search-user-start-chat' , function(user){
//     console.log(user.chats)
//     chatroomsPage.setState({latestChat: user.chats})
// });

//---------------------------------------------------

export default {
    registerApp,
    registerChatrooms,
    handleSendMessages,
    getLatestChats
}
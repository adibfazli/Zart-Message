import tokenService from './services/tokenService';
const socket = window.io();
let chatPage = null;



function registerApp(app) {
    chatPage = app;
}

function submitClicked(content) {
    const token = tokenService.getToken();
    socket.emit('click-submit', content)
}

socket.on ('click-submit', function(content) {
    console.log("inside chat page handle click ")
    console.log(content)
    chatPage.setState({content: content})
})
export default {
    registerApp,
    submitClicked
}
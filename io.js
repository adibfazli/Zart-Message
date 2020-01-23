const atob    = require('atob');
const jwt     = require('jsonwebtoken');
const User    = require('./models/user');
const Chat    = require('./models/chat');
const Message = require('./models/message');


let io;

module.exports = {
    init,
}

// ------------------function for finding all the chats for the user-------
function findUserChat(user){
    
}

function init(http) {
    io = require('socket.io')(http);
    // Listen for new connections from clients (socket)
    io.on('connection', function (socket) {
        
        console.log('connected to io');
        socket.on('get-user', async function({userId, token}) {
            const loggedInUser = await validateToken(token);
            if (!loggedInUser) return;

            const User = await User.findById(userId).populate('chats');
            socket.join(user._id, function() {
                io.to(user._id).emit('get-users', user)
            })


        })
        socket.on('send-message', async function({content, userName, user, chatId, token}){
            const loggedInUser = await validateToken(token);
            if (!loggedInUser) return;
            
            const chat = await Chat.findById(chatId).populate('messages');
            const newMessage = new Message( {
                user,
                userName,
                content
            })
            await newMessage.save();
            chat.messages.push(newMessage);
            await chat.save();
            socket.join(chat._id, function() {
                io.to(chat._id).emit('send-message', chat);
            });
        });
    });
}

function getIo() {
    return io;
}
  
function validateToken(token) {
    return new Promise(function(resolve) {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) resolve(false);
        resolve(decoded.user);
        });
    });
}
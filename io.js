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
function findUserChat(){
    chat.find({})

}

function init(http) {
    io = require('socket.io')(http);
    // Listen for new connections from clients (socket)
    io.on('connection', function (socket) {
        
        console.log('connected to io');
        //-------------------------------------------------
        socket.on('click-submit', async function(content) {
            console.log(content)
            socket.join(content, function() {
                io.to(content).emit("click-submit", content);
            });
        })
        
       //-----------------------search-user-start-chat--------------------------
       socket.on('search-user-start-chat', async function(phoneNum , token){
            const user = await JSON.parse(atob(token.split('.')[1])).user;
            User.findOne({_id : user._id} , function (err , sender){
                User.findOne({phone : phoneNum.search} , function(err , reciver){
                    Chat.create(new Chat , function(err , chat){
                        chat.users.push(sender._id);
                        chat.users.push(reciver._id);
                        sender.chats.push(chat._id);
                        reciver.chats.push(chat._id);
                        sender.save()
                        reciver.save()
                        chat.save()
                        socket.join(chat._id, function() {
                            io.to(chat._id).emit('search-user-start-chat', chat);
                        });
                    });
                })
            })
       });

       //-------------------------------------------------
       socket.on('chat-clicked', async function({ id, token }){
            console.log(id)
            const chat = await Chat.findById(id).populate("users");
            const user = await validateToken(token);
            if (!user) return;
            socket.join(chat._id, function() {
            io.to(chat._id).emit("chat-clicked", chat);
        });
      });

       //-------------------------------------------------
       //-------------------------------------------------
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
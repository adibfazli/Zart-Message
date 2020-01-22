const User = require('../models/user');
const Chat = require('../models/chat');


module.exports = {
    allChats,
    chatSelected,
  };

  function allChats(req , res){
    let chatNameAndId = []
    User.findById(req.body._id,  function(err , user){
       user.chats.forEach( chatId =>{
         Chat.findById(chatId ,  function(err , chat){
          let result
           chat.users.indexOf(user._id) ? result = chat.users[0] : result = chat.users[1]
           User.findById(result ,  function(err , reciver){
             chatNameAndId.push({[reciver.name] : chatId})
            if(user.chats.length == chatNameAndId.length) return res.json(chatNameAndId)
          })
        })
      })
    });
  }

function chatSelected(req,res){
  chat.findById(req.chatId).populate('message').exec( function(err , chatMessage){
    return res.json(chatMessage.message)
  })
}
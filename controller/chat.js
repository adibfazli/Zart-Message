const User = require('../models/user');
const Chat = require('../models/chat');


module.exports = {
    allChats,
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

//   async function allChats (req , res){
//   Chat.find({}).where('user').in([user1id, user2id]).exec(function(err, chats) {

//     console.log(user1id)
//     res.json(chats);
//   });
// }



  // async function allChats (req , res){
  //   const chatNameAndId = []
  //   const user =  User.findById(req.body._id).then(
  //     user.chats.forEach(e =>{
  //      Chat.findById(e ,  function(err , chat){
  //        let result
  //        chat.users.indexOf(user._id) ? result = chat.users[0] : result = chat.users[1]
  //        User.findById(result , function(err , reciver){
  //            chatNameAndId.push({[reciver.name] : e})
  //          })
  //        })
  //      })
  //   ).then(function (){
  //     console.log("in the chat",chatNameAndId)
  //     return res.json(chatNameAndId)

  //   }

  //   )
  // }
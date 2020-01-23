const User = require('../models/user');
const Chat = require('../models/chat');


module.exports = {
    allChats,
    chatSelected,
    findChat
  };

async function findChat (req, res) {
  // const chat = await Chat.find({})
  // .where('users').in([req.params.userId, req.user._id])
  // // .sort('createdAt')
  // .exec(function(err, chat) {
  //   console.log(res.json(chat));
  //   res.json(chat);
  // });
  const user1 = await User.findById(req.params.userId).populate('chats');
  const user2 = await User.findById(req.user._id).populate("chats");
  // let chat = await Chat.findOne({users: [req.user._id, req.params.userId]}).populate('messages');
  let chat = findExistedChat(user1, user2);
  if (chat === null) {
    // create chat if there is no user
    chat = new Chat({
      users: [req.params.userId, req.user._id]
    })
    await chat.save();
    user1.chats.push(chat);
    user2.chats.push(chat);
    await user1.save();
    await user2.save();

  } else {
    chat = await Chat.findById(chat._id).populate('messages');
  }
  res.json(chat);
}

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
    console.log("chat ctrl",req.body[0])
    Chat.findById(req.body[0]).populate('message').exec( function(err , chatMessage){
      chatMessage.populate('users').exec( (e) => {
        console.log("E : ",e)

      })
      
    })
  }







  // help function
  function findExistedChat(user1, user2) {
    let chatId = null;
    user1.chats.forEach( ch1 => {
      user2.chats.forEach( ch2 => {
        if (JSON.stringify(ch1) === JSON.stringify(ch2)) {
          chatId = ch1;
        }
      })
    })
    return chatId;
  }
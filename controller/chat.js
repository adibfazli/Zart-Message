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

  async function allChats(req , res){
    chatIdAndReciver=[]
    var user = await User.findOne({_id : req.body._id}).populate('chats')
    await user.chats.forEach( async element => {
      await User.findOne({_id : element.users.filter(el=> el != req.body._id)[0]} , function (err , reciver){
        chatIdAndReciver.unshift({[reciver.name] : reciver._id})
        if(user.chats.length == chatIdAndReciver.length) return res.json(chatIdAndReciver)
      })
    })
  }

  function chatSelected(req,res){
    Chat.findById(req.body[0]).populate('message').exec( function(err , chatMessage){
      chatMessage.populate('users').exec( (e) => {
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
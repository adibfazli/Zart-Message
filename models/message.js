const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: String,
  content: String,
},{
  timestamps: true
});

module.exports = mongoose.model("Message", messageSchema);

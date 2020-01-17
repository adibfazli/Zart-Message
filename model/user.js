const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: String,
    email: {type: String, required: true, lowercase: true, unique: true},
    password: String
  }, {
    timestamps: true
  });

module.exports = mongoose.module('User' , userSchema)


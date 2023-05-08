const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nume: {
    type: String,
    required: true
  },
  prenume: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  parola: {
    type: String,
    required: true
  }
});/*
userSchema.methods.verifyPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
userSchema.statics.authenticate = async function(email, parola) {
  const user = await this.findOne({ email });
  if (user && await user.verifyPassword(parola)) {
    return user;
  }
  return null;
};*/


//module.exports = mongoose.model('User', userSchema);
//module.exports=User;
const LogInCollection=new mongoose.model('LogInCollection',userSchema)

module.exports=LogInCollection
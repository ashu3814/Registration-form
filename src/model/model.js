const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
});

empSchema.methods.createToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id.toString() } , "cwjdbbifbvefjbfehlbuhfuhfiohfuihciebjbifebhbfijbfeihb");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();

    return token;
  } catch (error) {
    console.log(error);
  }
};

empSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const empCollection = mongoose.model('empcollection', empSchema);

module.exports = empCollection;

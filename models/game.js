const mongoose  = require("mongoose");
const categoryModel = require('./category');
const usersModel = require('./user');

const gameSchema = new mongoose.Schema({
  title: {

    type: String,

    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  categories: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: categoryModel,
    }
],
  users:  [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: usersModel,
    }
],
});

const game = mongoose.model('game', gameSchema);
module.exports = game;
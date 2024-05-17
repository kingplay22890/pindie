const games = require('../models/game');

const findAllGames = async (req, res, next) => {
    console.log("GET /games")
    req.gamesArray = await games.find({}).populate("categories").populate(
        {
            path: "users",
            select: "-password",
        }
    );
    next();
};
const findGameById = async (req, res, next) => {
    console.log("GET /games/:id");
    try {   
      req.game = await games
        .findById(req.params.id)
        .populate("categories")
        .populate({
            path: "users",
            select: "-password",
        }); 
      next(); 
    } catch (error) {
      res.status(404).send({ message: "Игра не найдена" });
    }
  };
const createGame = async (req, res, next) => {
    console.log("POST /games");
    try {
      console.log(req.body);
      req.game = await games.create(req.body);
      next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }));
    }
  };

const checkIsGameExists= async (req, res, next) => {
console.log(req.gamesArray);
const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
});
console.log(isInArray);
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send({ message: "Игра с таким названием уже существует" });
  } else {
    next();
  }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Выбери хотя бы одну категорию" }));
  } else {
    next();
  }
}; 
const checkEmptyFields = async (req, res, next) => {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.image ||
      !req.body.link ||
      !req.body.developer
    ) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
    } else {
      next();
    }
  };
  const checkIfUsersAreSafe = async (req, res, next) => {
    console.log(req.body.users);
    if (!req.body.users) {
      next();
      return;
    }
    if (req.body.users.length - 1 === req.game.users.length) {
      next();
      return;
    } else {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));
    }
  };
  const updateGame = async (req, res, next) => {
    
console.log("PUT /games/:id");     
    try {
   
      req.game = await games.findByIdAndUpdate(req.params.id, req.body);
      next();
    } catch (error) {
      res.status(400).send({ message: "Ошибка обновления игры" });
    }
  }; 
  
const deleteGame = async (req, res, next) => {
    try {
      req.game = await games.findByIdAndDelete(req.params.id);
      next();
    } catch (error) {
      res.status(400).send({ message: "Error deleting game" });
    }
  };
module.exports = {findAllGames, createGame, checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, findGameById, checkIfUsersAreSafe, updateGame, deleteGame};
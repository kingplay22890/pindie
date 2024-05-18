const gamesRouter = require('express').Router();

const  {sendAllGames, sendGameCreated, sendGameUpdated, sendGameDeleted, }  = require('../controllers/games');
const  { checkAuth }= require('../middlewares/auth');
const {findAllGames, createGame, checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, findGameById, checkIfUsersAreSafe, updateGame, deleteGame} = require('../middlewares/games');


gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.post('/games', findAllGames, checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, checkAuth, createGame, sendGameCreated);
gamesRouter.put(
    "/games/:id",
    findGameById,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    updateGame,
    sendGameUpdated
  ); 
gamesRouter.delete(
    "/games/:id", 
    checkAuth, 
    deleteGame,
    sendGameDeleted
  );
module.exports = gamesRouter;
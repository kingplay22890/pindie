const gamesRouter = require('express').Router();

const  {sendAllGames, sendGameCreated, sendGameUpdated, sendGameDeleted, sendGameById, }  = require('../controllers/games');
const  { checkAuth }= require('../middlewares/auth');
const {findAllGames, createGame, checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, findGameById, checkIfUsersAreSafe, updateGame, deleteGame, checkIsVoteRequest} = require('../middlewares/games');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.post('/games', findAllGames, checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, checkAuth, createGame, sendGameCreated);
gamesRouter.put(
    "/games/:id",
    findGameById,
    checkIsVoteRequest,
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
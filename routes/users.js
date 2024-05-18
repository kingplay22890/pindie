const {sendAllUsers, sendUserCreated, sendUserUpdated, sendUserDeleted, sendMe,} = require('../controllers/users');
const { checkAuth } = require('../middlewares/auth');
const {findAllUsers, checkIsUserExists, checkEmptyNameAndEmail, createUser, updateUser, deleteUser, hashPassword, } = require('../middlewares/users');

const usersRouter = require('express').Router();

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get("/me", checkAuth, sendMe);
usersRouter.post(
    '/users', 
    findAllUsers, 
    checkIsUserExists,
    checkEmptyNameAndEmail,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated,

);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
 );
 usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);

module.exports = usersRouter;
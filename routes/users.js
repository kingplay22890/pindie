const {sendAllUsers, sendUserCreated, sendUserUpdated, sendUserDeleted,} = require('../controllers/users');
const {findAllUsers, checkIsUserExists, checkEmptyNameAndEmail, createUser, updateUser, deleteUser, } = require('../middlewares/users');

const usersRouter = require('express').Router();

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.post(
    '/users', 
    findAllUsers, 
    checkIsUserExists,
    checkEmptyNameAndEmail,
    createUser,
    sendUserCreated,

);
usersRouter.put(
  "/users/:id",
    updateUser,
    sendUserUpdated
 );
 usersRouter.delete("/users/:id", deleteUser, sendUserDeleted);
module.exports = usersRouter;
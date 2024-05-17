const users = require('../models/user');

const findAllUsers = async (req, res, next) => {
  console.log("GET /users")
  req.usersArray = await users.find({});
  next();
}

const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
}; 

const createUser = async (req, res, next) => {
  console.log("POST /users");
  try {
    console.log(req.body);
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};
const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
  } else {
    next();
  }
};
const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Введите имя и email" }));
  } else {
    next();
  }
};
const updateUser = async (req, res, next) => {
    
  console.log("PUT /users/:id");     
      try {
     
        req.user = await users.findByIdAndUpdate(req.params.id, req.body);
        next();
      } catch (error) {
        res.status(400).send({ message: "Ошибка обновления пользователя" });
      }
    }; 
    const deleteUser = async (req, res, next) => {
      console.log("DELETE /users/:id");
      try {
        req.user = await users.findByIdAndDelete(req.params.id);
        next();
      } catch (error) {
        res.setHeader("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
      }
    };
module.exports = {findAllUsers, findUserById, createUser, checkIsUserExists, checkEmptyNameAndEmail, updateUser, deleteUser};
const sendAllUsers = (req, res) => {

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.usersArray));
};
const sendUserCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};
const sendUserUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send({ message: "Пользователь обновлён" });
};
const sendUserDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(req.user));
};
const sendMe = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};
module.exports = {sendAllUsers, sendUserCreated, sendUserUpdated, sendUserDeleted, sendMe};

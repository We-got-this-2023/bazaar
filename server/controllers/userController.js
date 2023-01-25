function getUsers(req, res) {
  res.send("getUsers");
}

function getUser(req, res) {
  res.send("getUser");
}

function createUser(req, res) {
  res.send("createUser");
}

function deleteUser(req, res) {
  res.send("deleteUser");
}

function updateUser(req, res) {
  res.send("updateUser");
}

export { getUsers, getUser, createUser, deleteUser, updateUser };

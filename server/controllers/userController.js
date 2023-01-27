import prisma from "../server.js";

const getUsers = async (req, res) => {
  res.send("getUsers");
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  res.send("deleteUser");
};

const updateUser = async (req, res) => {
  res.send("updateUser");
};

export { getUsers, getUser, createUser, deleteUser, updateUser };

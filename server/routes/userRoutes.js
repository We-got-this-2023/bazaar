import express from "express";

const router = express.Router();

// "/" refers to "/users"
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.export = router;

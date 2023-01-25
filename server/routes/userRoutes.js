import express from 'express'

const router = express.Router()

// ----------------------------------------
// Functions to prevent errors until the controllers are created
let getUsers, getUser, createUser, deleteUser, updateUser
getUsers = getUser = createUser = deleteUser = updateUser = () => {}
// ----------------------------------------

// "/" refers to "/users"
router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)

export default router

// Functions to prevent errors until the controllers are created

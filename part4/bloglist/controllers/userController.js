const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const logger = require('../utils/logger')
const User = require('../models/user')


usersRouter.get('/api/users', async (request, response) => {
    const blogs = await User.find({})
    response.json(blogs)
})

usersRouter.post('/api/users', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter
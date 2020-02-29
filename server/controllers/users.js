const Sequelize = require('sequelize')

module.exports = {
  add: register,
  login: login,
  get: getUser,
  all: getAll
}

function register(req, res) {

  const email = req.body.email
  const password = req.body.password
  if (!email || !password) {
    res.status(400).send({
      error: 'нет email или password'
    })
  } else {
    res.status(200).send({
      email: email,
      password: password
    })
  }
}

function login(req, res) {
  const email = req.query.email
  const password = req.query.password
  if (!email || !password) {
    res.status(400).send({
      error: 'not email or password'
    })
  } else {
    res.status(200).send({
      email: email,
      password: password
    })
  }
}

function getUser(req, res) {
  const id = req.query.id
  if (!id) {
    res.status(400).send({
      message: 'error id not found'
    })
  } else {
    res.status(200).send({
      message: 'get user  ' + id
    })
  }
}

function getAll(req, res) {
  var {
    limit,
    offset,
    page
  } = req.query
  if (!limit || limit < 1) {
    limit = 20
  }
  if (!offset) {
    offset = limit * page
  }

  if (!offset || offset < 0) {
    offset = 0
  }
  var users = []
  var i;
  for (i = Number(offset); i < (Number(limit) + Number(offset)); i++) {
    users.push("user_" + i)
  }
  res.status(200).send({
    message: "users list with offset: " + offset + ", and limit: " + limit,
    users: users
  })
}

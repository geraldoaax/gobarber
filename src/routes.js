const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddlewares = require('./app/middlewares/auth')
const guestMiddlewares = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')

// variável global para que todas as views fiquem sabendo das mensagens de erro
routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.use('/app/', authMiddlewares)

// rota logout
routes.get('/app/logout', SessionController.destroy)

routes.get('/', guestMiddlewares, SessionController.create)
routes.post('/signin', SessionController.store)

// routes.get('/', (req, res) => res.render('auth/signup'))
routes.get('/signup', guestMiddlewares, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/dashboard', DashboardController.index)

module.exports = routes

const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddlewares = require('./app/middlewares/auth')
const guestMiddlewares = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

// variável global para que todas as views fiquem sabendo das mensagens de erro
// routes.use((req, res, next) => {
//   res.locals.flashSucces = req.flash('success')
//   res.locals.flashError = req.flash('error')

//   return next()
// })

// rota para ver os arquivos de imagem
routes.get('/files/:file', FileController.show)

routes.use('/app/', authMiddlewares)

// rota logout
routes.get('/app/logout', SessionController.destroy)

routes.get('/', guestMiddlewares, SessionController.create)
routes.post('/signin', SessionController.store)

// routes.get('/', (req, res) => res.render('auth/signup'))
routes.get('/signup', guestMiddlewares, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)
routes.get('/app/available/:provider', AvailableController.index)

module.exports = routes

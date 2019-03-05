const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body
    // método do sequelize de buscar apenas um registro
    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Usuário não encontrato')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha Incorreta')
      return res.redirect('/')
    }

    return res.redirect('/app/dashboard')
  }
}

module.exports = new SessionController()
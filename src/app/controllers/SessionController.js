const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body
    // método do sequelize de buscar apenas um registro
    const user = await User.findOne({ where: { email } })
    // Checa se o usuário existe
    if (!user) {
      req.flash('error', 'Usuário Não Encontrado!')
      return res.redirect('/')
    }
    // checa a validade da senha
    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha Incorreta!')
      return res.redirect('/')
    }
    req.session.user = user

    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()

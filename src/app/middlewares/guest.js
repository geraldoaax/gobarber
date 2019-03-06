module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    // seta um objeto de informações para todos os objetos (nunjucks)
    return next()
  }
  return res.redirect('/app/dashboard')
}

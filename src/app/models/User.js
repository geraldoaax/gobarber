const bcrypt = require('bcryptjs')

module.exports = (sequilize, Datatypes) => {
  const User = sequilize.define(
    'User',
    {
      name: Datatypes.STRING,
      email: Datatypes.STRING,
      avatar: Datatypes.STRING,
      password: Datatypes.VIRTUAL,
      password_hash: Datatypes.STRING,
      provider: Datatypes.BOOLEAN
    },
    {
      // hook = trigger (Vários tipos dentro do sequelizer - ver manual)

      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  return User
}

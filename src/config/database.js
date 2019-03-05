module.exports = {
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: 'docker',
  database: 'gobarber',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}

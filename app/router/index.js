module.exports = app => {
  require('./user')(app)
  require('./company')(app)
}

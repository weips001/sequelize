module.exports = app => {
  const { router, controller } = app
  router.resources('user', '/user', controller.user)
}

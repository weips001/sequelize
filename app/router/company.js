module.exports = app => {
  const { router, controller } = app
  router.resources('company', '/company', controller.company)
  router.post('/company/test', controller.company.test)
}

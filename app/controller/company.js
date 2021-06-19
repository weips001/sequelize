// app/controller/companys.js
const Controller = require('egg').Controller

function toInt (str) {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}

class CompController extends Controller {
  async index () {
    const ctx = this.ctx
    const { Op } = this.app.Sequelize
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      // where: {
      //   name: {
      //     [Op.substring]: ctx.query.name || ''
      //   }
      // },
      order: [
        ['createdAt', 'DESC']
      ]
    }
    ctx.body = await ctx.service.company.list(query)
  }

  async show () {
    console.log(123)
    const ctx = this.ctx
    const {query} = this.app.model
    console.log(query)
    const res = await this.app.model.query('SELECT * FROM `user`', {type: 'SELECT', plain: false})
    console.log('res', res)
    // ctx.body = await ctx.model.Company.findByPk(toInt(ctx.params.id))
    ctx.body = res
  }

  async create () {
    const ctx = this.ctx
    // const { name, age } = ctx.request.body

    ctx.body = await ctx.service.company.create(ctx.request.body)
  }

  async update () {
    const ctx = this.ctx
    const id = toInt(ctx.params.id)
    const company = await ctx.model.company.findByPk(id)
    if (!company) {
      ctx.status = 404
      return
    }

    const { name, age } = ctx.request.body
    await company.update({ name, age })
    ctx.body = company
  }

  async destroy () {
    const ctx = this.ctx
    const id = toInt(ctx.params.id)
    const company = await ctx.model.company.findByPk(id)
    if (!company) {
      ctx.status = 404
      return
    }

    await company.destroy()
    ctx.status = 200
  }

  async test () {
    const ctx = this.ctx
    const res = await this.ctx.model.Company.findAll({
      group: 'comp_name'
    })
    this.ctx.body = res
  }
}

module.exports = CompController

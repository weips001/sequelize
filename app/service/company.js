'use strict'

const CommenService = require('./common')

class CompService extends CommenService {
  async list (query) {
    const { ctx } = this
    // const { Op } = this.app.Sequelize
    // console.log(Op)
    const { count, rows } = await ctx.model.Company.findAndCountAll(query)
    const result = {
      total: count,
      list: rows
    }
    return this.success(result)
  }

  async checkCompName(compName) {
    const company = await this.ctx.model.Company.findOne({
      where: {
        compName
      }
    })
    if(company) { 
      return this.error(null, '公司名稱已存在')
    }
    return this.success(company, null)
  }

  async create (body) {
    const { ctx } = this
    const {compName} = body
    // const hasName = await this.checkCompName(compName)
    // if (hasName.code !== '0') {
    //   return hasName
    // }
    const options = {
      where: {
        compName
      },
      defaults: body
    }
    const company = await ctx.model.Company.findOrCreate(options)
    console.log('company', company)
    return this.success(company)
  }
}

module.exports = CompService

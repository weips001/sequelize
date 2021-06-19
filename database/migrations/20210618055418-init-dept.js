'use strict'
const uuid = require('uuid').v4
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const {  DATE, STRING, UUID } = Sequelize
    await queryInterface.createTable('company', {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: () => {
          return uuid().replace(/-/g, '')
        }
      },
      compName: {
        type: STRING(30),
        allowNull: false,
        field: 'comp_name',
        validate: {
          notNull: {
            msg: '公司名稱必須填寫'
          },
          notEmpty: {
            msg: '公司名稱不能為空'
          }
        }
      },
      address: STRING(100),
      email: {
        type: STRING(30),
        validate: {
          isEmail: {
            msg: '必須是郵箱格式'
          }
        }
      },
      status: {
        type: STRING(1),
        defaultValue: '0',
        validate: {
          isIn: {
            args: [['0', '1', '2', '3']],
            msg: '請選擇正確的公司狀態'}
        }
      },
      created_at: DATE,
      updated_at: DATE
    })
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('company')
  }
}

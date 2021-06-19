'use strict'
const uuid = require('uuid').v4
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { DATE, UUID, STRING, NOW } = Sequelize
    await queryInterface.createTable('test', {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: () => {
          return uuid().replace(/-/g, '')
        }
      },
      birthDay: {
        type: DATE,
        // field: 'birth_day',
        validate: {
          isBefore: NOW
        }
      },
      deptName: {
        type: STRING(30)
      }
    })
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('test')
  }
}

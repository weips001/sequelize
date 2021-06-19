'use strict'
const uuid = require('uuid').v4
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, UUID, NOW } = Sequelize
    await queryInterface.createTable('user', {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: () => {
          return uuid().replace(/-/g, '')
        }
      },
      name: {
        type: STRING(30),
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      age: {
        type: INTEGER
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
      sex: {
        type: STRING(1),
        validate: {
          isIn: [['0', '1']],
          msg: '性別只能是男或者女'
        }
      },
      birthday: {
        type: DATE,
        validate: {
          isBefore: NOW
        }
      },
      deptName: {
        type: STRING(30),
        field: 'dept_name'
      },
      compId: {
        type: UUID,
        field: 'comp_id',
        // references: {
        //   model: {
        //     tableName: 'company'
        //   },
        //   key: 'id'
        // },
        allowNull: false
      },
      created_at: DATE,
      updated_at: DATE
    })
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('user')
  }
}

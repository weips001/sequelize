'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, UUID } = app.Sequelize
  const Company = app.model.define('company', {
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
    }
  })

  return Company
}

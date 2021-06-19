exports.keys = 'mysql'

exports.sequelize = {
  dialect: 'mysql',
  host: '10.213.134.254',
  username: 'root',
  password: 'www.2020',
  port: 3306,
  database: 'wps',
  timezone: '+08:00',
  define: {
    underscored: true,
    freezeTableName: true
  }
}

exports.security = {
  csrf: {
    enable: false
  }
}

// exports.middleware = ['errorHandler']

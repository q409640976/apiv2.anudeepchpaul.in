// const config = require('dotenv').config();

const config = {
    SERVER_PORT: 3025
}

const app = require('./app')
const { connect } = require('./db')

const start = async () => {
    try {
      await app.listen(config.SERVER_PORT)
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }

connect().then((client) => {
    
    app.db = client
    start()
})
'use strict'

/*
|--------------------------------------------------------------------------
| Https server
|--------------------------------------------------------------------------
*/

const { Ignitor } = require('@adonisjs/ignitor')
const https = require('https')
const path = require('path')
const fs = require('fs')

// Certificados
const options = {
  key: fs.readFileSync(path.join(__dirname, './certs/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './certs/server.cert'))
}

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer((handler) => {
    return https.createServer(options, handler)
  })
  .catch(console.error)

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const fs = require('fs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const replaceSeoData = function (response, opts = {}) {
  const filePath = path.resolve(__dirname, './build', 'index.html')

  fs.readFile(filePath, 'utf8', function (err, indexHTMLData) {
    if (err) {
      return console.log(err)
    }

    indexHTMLData = indexHTMLData.replace(/__TITLE__/g, 'Example')

    response.send(indexHTMLData)

    // optionally you can fetch meta from api and replace it for each unique url
    // fetchSeoData(indexHTMLData, opts, function(data) {
    //   response.send(data)
    // })
  })
}

app.get('/', function (request, response) {
  replaceSeoData(response, { hostname: request.hostname })
})

app.use(express.static(path.resolve(__dirname, './build')))

app.get('*', function (request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err, indexHTMLData) {
    if (err) {
      return console.log(err)
    }

    response.send(indexHTMLData)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))

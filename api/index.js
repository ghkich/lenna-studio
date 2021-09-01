const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000
const jsonParser = bodyParser.json()

app.use(cors())
app.options('*', cors())

app.get('/routes', (request, response) => {
  const routes = require('./routes')
  response.json(routes)
})

app.post('/pageData', jsonParser, (request, response) => {
  const routes = require('./routes')
  const HTML = require('html-parse-stringify')
  const {route, scenario} = request.body

  const currentRoute = routes.find((r) => r.path === route.path)
  const currentScenario = currentRoute.scenarios.find((s) => s.name === scenario.name)

  const html = HTML.parse(currentScenario.html)

  response.json(html)
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

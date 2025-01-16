const parseService = require('./services/parser')

const express = require('express')
const PORT = 3000
const app = express()
app.use(express.json())

app.get('/' , async (req , res)=> {
  const response = await parseService.parserFile()
  if(response.error) return res.status(404).send(response)
  res.send(response)
})
if (require.main === module) {
  app.listen(PORT, () => console.log(`[SERVER] http://localhost:${PORT}`));
}
module.exports = app 
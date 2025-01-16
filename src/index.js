require('dotenv').config()
const parseService = require('./services/parser')

const express = require('express')

const app = express()
app.use(express.json())

app.get('/' , async (req , res)=> {
  const response = await parseService.parserFile()
  res.send(response)
})

app.listen(3000, () => console.log('Server listening on port 3000'))
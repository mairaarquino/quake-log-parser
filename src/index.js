require('dotenv').config()
const parseService = require('./services/parser')

const express = require('express')

const app = express()
app.use(express.json())

app.get('/' , async (req , res)=> {
  
  res.send(await parseService.parserFile())
})

app.listen(3000, () => console.log('Server listening on port 3000'))
require('dotenv').config()
const express = require('express')

const app = express()
app.use(express.json())

app.get('/' , (req , res)=>{
  res.send('hello from simple server :)')
})

app.listen(3000, () => console.log('Server listening on port 3000'))
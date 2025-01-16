const fs = require('fs')

const parserFile = async () => {
  const file = fs.readFileSync('./files/games.log', 'utf-8')
  const games = file.split('InitGame')
  
  return games
}

module.exports = {
  parserFile
}
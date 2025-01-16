const fs = require('fs')

const parserFile = async () => {
  const file = fs.readFileSync('./files/games.log', 'utf-8')
  const games = file.split('InitGame')
  
  games.shift()
  const gamesByLine = games.map(game => game.split('\n'))
  return gamesByLine.map(line => line.filter(line => /Kill/i.test(line)))

  return gamesByLine
}

module.exports = {
  parserFile
}
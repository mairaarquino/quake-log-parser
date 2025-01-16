const fs = require('fs')

const parserFile = async () => {
  try {
    const file = fs.readFileSync('./files/games.log', 'utf-8')
    const arrayGames = file.split('InitGame')
    
    arrayGames.shift()
    const gamesByLine = arrayGames.map(game => game.split('\n'))
    const filterKills = gamesByLine.map(line => line.filter(line => /Kill/i.test(line)))

    return countKills(filterKills)
  } catch (err) {
    if(err && err.code === 'ENOENT') {return { error: 'Arquivo não encontrado!'}}
  }
}

const countKills = (arrayKills) => {  
  let gameCounter = 0

  return arrayKills.map(game => {
    const players = []
    const kills = {}

    for (const line of game) {
      const infoKill = line.split(':')?.[3]
      const splitInfoKill = infoKill.split('by');
      const playersEnvolved = splitInfoKill[0].split('killed').map(item => item.trim())

      if(playersEnvolved[0] === '<world>') {
        kills[playersEnvolved[1]] = (kills[playersEnvolved[1]] || 0) - 1;
      } else {
        kills[playersEnvolved[0]] = (kills[playersEnvolved[0]] || 0) + 1;
      }

      players.push(...playersEnvolved)
    }
    const arrayPlayers = players
      .reduce((acc, value) => acc.includes(value) ? acc : [...acc, value], [])
      .filter(item => item !== '<world>')

    delete kills['<world>']
    gameCounter++
    return {
      [`game_${gameCounter}`]: {
        total_kills: game.length,
        players: arrayPlayers,
        kills
      }
    }
  })
}
module.exports = {
  parserFile
}
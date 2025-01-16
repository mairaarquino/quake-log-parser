const fs = require('fs')

const parserFile = async () => {
  console.log('Reading file...')
  try {
    const file = fs.readFileSync('./files/games.log', 'utf-8')
    const games = file.split('InitGame')
    
    games.shift()
    const gamesByLine = games.map(game => game.split('\n'))
    const arrayKills = gamesByLine.map(line => line.filter(line => /Kill/i.test(line)))

    return countKills(arrayKills)
  } catch (err) {
    if(err && err.code === 'ENOENT') return { error: 'Arquivo não encontrado!'}
  }
}

const countKills = (arrayKills) => {
  console.log('Counting kills...')
  console.log('Reading players...')

  let i = 0
  const response = arrayKills.map(game => {
    const players = []
    const kills = {}

    for (const line of game) {
      const arraygame = line.split(':')
      const killLine = arraygame[3]
      const itens = killLine.split('by');
      const playersEnvolved = itens[0].split('killed').map(item => item.trim())

      if(playersEnvolved[0] === '<world>') kills[playersEnvolved[1]] = kills[playersEnvolved[1]] -1
      kills[playersEnvolved[0]] = kills[playersEnvolved[0]] + 1 || 1

      players.push(...playersEnvolved)
    }
    const arrayPlayers = players
      .reduce((acc, value) => acc.includes(value) ? acc : [...acc, value], [])
      .filter(item => item != '<world>')

    delete kills['<world>']
    i++
    return {
      [`game_${i}`]: {
          total_kills: game.length,
          players: arrayPlayers,
          kills
        }
    }
  })
  console.log('File processed!')
  return response
}
module.exports = {
  parserFile
}
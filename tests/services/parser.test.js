const fs = require('fs')
const { parserFile } = require('../../src/services/parser')

jest.mock('fs')

describe('parserFile', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('deve tratar os dados corretamente dado um arquivo válido', async () => {
    const mockFileContent = `
    util  0:00 ------------------------------------------------------------
      0:00 InitGame: 
      15:00 Exit: Timelimit hit.
      20:34 ClientConnect: 2
      20:34 ClientUserinfoChanged:
      20:37 ClientBegin: 2
      20:37 ShutdownGame:
      20:40 InitGame: ...
      20:40 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
      20:40 Kill: 2 3 10: Isgalamido killed Isgalamido by MOD_RAILGUN
      20:40 InitGame: ...
      20:40 Kill: 1022 4 22: <world> killed Mocinha by MOD_TRIGGER_HURT
      20:40 Kill: 4 5 10: Mocinha killed Isgalamido by MOD_RAILGUN
    `
    fs.readFileSync.mockReturnValue(mockFileContent)

    const result = await parserFile()

    expect(result).toEqual([
      {
        game_1: {
          total_kills: 0,
          players: [],
          kills: {}
        }
      },
      {
        game_2: {
          total_kills: 2,
          players: ['Isgalamido'],
          kills: {
            Isgalamido: 0
          }
        }
      },
      {
        game_3: {
          total_kills: 2,
          players: ['Mocinha', 'Isgalamido'],
          kills: {
            Mocinha: 0
          }
        }
      }
    ])
  })

  it('deve retornar erro quando arquivo não for encontrado', async () => {
    fs.readFileSync.mockImplementation(() => {
      const error = new Error('Arquino não encontrado!')
      error.code = 'ENOENT'
      throw error
    })

    const result = await parserFile()

    expect(result).toEqual({ error: 'Arquivo não encontrado!' })
  })

  it('deve tratar arquivo vazio', async () => {
    fs.readFileSync.mockReturnValue('')
    const result = await parserFile()

    expect(result).toEqual([])
  })
})
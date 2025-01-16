const request = require('supertest')
const express = require('express')

const parseService = require('../src/services/parser')
const app = require('../src/index')

jest.mock('../src/services/parser', () => ({
  parserFile: jest.fn(() => Promise.resolve([
    {
        "game_1": {
            "total_kills": 0,
            "players": [],
            "kills": {}
        }
    },
    {
        "game_2": {
            "total_kills": 11,
            "players": [
                "Isgalamido",
                "Mocinha"
            ],
            "kills": {
                "Isgalamido": -5
            }
        }
    }])),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('[GET] /', () => {
  it('deve retornar service mockado corretamente', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual([
      {
          "game_1": {
              "total_kills": 0,
              "players": [],
              "kills": {}
          }
      },
      {
          "game_2": {
              "total_kills": 11,
              "players": [
                  "Isgalamido",
                  "Mocinha"
              ],
              "kills": {
                  "Isgalamido": -5
              }
          }
      }]);
    expect(parseService.parserFile).toHaveBeenCalledTimes(1);
  }, 10000)
})
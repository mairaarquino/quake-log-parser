# Quake log parser
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)\
\
O projeto tem como objetivo a leitura de um arquivo de log do jogo quake e seu processamento,
tornando mais legível as principais informações como jogadores, total de kills e kills por jogadores.\
Para o desenvolvimento foram utilizados apenas Node.js e Express.js para criação do servidor.


## Funcionalidades do Projeto
- Leitura do arquivo `games.log` encontrado dentro da pasta `files`.
- Criação de um endpoint base que processa os principais dados do arquivo e cria um resumo sobre cada partida.

## Configuração
  1. Requisitos\
    - `Node.js`\
    - `NPM`\
    - `GIT`
  2. Clone o repositório
```bash
  git clone https://github.com/mairaarquino/quake-log-parser
  cd quake-log-parser
 ```

 1. Instale as dependências
   ```bash
    npm install
   ```

  2. Execute o projeto
   ```bash
    npm start
   ```

## Explicação da solução
- Utilizei `express.js` para criar o servidor e o endpoint
- Este endpoint chama o arquivo `parser` na pasta `services`
- Inicio a leitura do arquivo usando a lib nativa `fs`
- Separo o arquivo por rodadas do jogo, ou seja onde é encontrada a expressão `InitGame`
- Filtro somente as kills e envio o array gerado para a função `countKills`
- Essa função possui um:
  - Contador de kills totais
  - Listagem de jogadores
  - Contador de kills por player
- Separo a informação principal de cada linha ou seja tudo a partir dos `:`
- Separo a arma utilizada na kill pela palavra `by` 
- Separo os jogadores envolvidos pela palavra `killed`
- Se o jogador responsável pela kill for o `<world>`, quem foi morto por ele perde uma kill
- Somo uma kill ao jogador responsável a mesma
- Adiciono todos os jogadores a listagem de jogadores
- No `arrayPlayers` removo jogadores duplicados e o `<world>` da listagem
- Removo o `<world>` da contagem de kills por jogadores 
- Monto o retorno final com as informações processadas e devolvo para o endpoint
# Autora

|  [<img loading="lazy" src="https://avatars.githubusercontent.com/u/22153712?v=4" width=115><br><sub>Maíra Arquino</sub>](https://github.com/mairarquino) |
| :---: |

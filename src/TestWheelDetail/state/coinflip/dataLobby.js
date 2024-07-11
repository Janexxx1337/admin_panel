import { reactive } from 'vue';

export const dataCoinflip = reactive({
  lobbyItems: [
    {
      host: { avatar: 'user1', name: 'Nabme', side: 't', items: ['classified'] },
      opponent: { avatar: 'user5', name: 'Skullguyguyguyguyg', side: 'ct', items: ['classified', 'knife'] },
      gameId: 1,
      winner: 'host',
    },
    {
      host: { avatar: 'user8', name: 'StarryKnight', side: 'ct', items: ['classified', 'covert', 'knife'] },
      opponent: { avatar: 'user5', name: 'Skull', side: 't', items: ['classified', 'covert', 'knife'] },
      gameId: 2,
      winner: 'host',
    },
    {
      host: { avatar: 'user1', name: 'Nabme', side: 'ct', items: ['classified', 'covert'] },
      opponent: { avatar: 'user8', name: 'StarryKnight', side: 't', items: ['classified', 'covert'] },
      gameId: 3,
      winner: 'opponent',
    },
    {
      host: { avatar: 'user1', name: 'Nabme', side: 'ct', items: ['classified'] },
      opponent: { avatar: 'user5', name: 'Skull', side: 't', items: ['classified', 'covert', 'knife'] },
      gameId: 4,
      winner: 'opponent',
    },
    {
      host: { avatar: 'user1', name: 'Nabme', side: 'ct', items: ['classified', 'covert'] },
      opponent: { avatar: 'user8', name: 'StarryKnight', side: 't', items: ['classified', 'covert', 'knife'] },
      gameId: 5,
      winner: 'opponent',
    },
    {
      host: { avatar: 'user8', name: 'StarryKnight', side: 'ct', items: ['classified', 'covert', 'knife'] },
      gameId: 6,
      winner: 'host',
    },
    {
      host: { avatar: 'user1', name: 'Nabme', side: 't', items: ['classified'] },
      gameId: 7,
      winner: 'host',
    },
    {
      host: { avatar: 'user1', name: 'Nabme', side: 't', items: ['classified'] },
      opponent: { avatar: 'user5', name: 'Skull', side: 'ct', items: ['classified', 'covert', 'knife'] },
      gameId: 8,
      winner: 'host',
    },
  ],
  fillGame() {
    const lobbyGames = [
      {
        host: { avatar: 'user8', name: 'StarryKnight', side: 'ct', items: ['covert', 'knife'] },
        gameId: 9,
      },
      {
        host: { avatar: 'user1', name: 'Nabme', side: 't', items: ['classified', 'covert', 'knife'] },
        gameId: 10,
      },
      {
        host: { avatar: 'user1', name: 'Nabme', side: 't', items: ['knife'] },
        opponent: { avatar: 'user8', name: 'StarryKnight', side: 'ct', items: ['classified', 'covert', 'knife'] },
        gameId: 11,
        winner: 'host',
      },
      {
        host: { avatar: 'user1', name: 'Nabme', side: 't', items: ['classified', 'covert','knife'] },
        opponent: { avatar: 'user6', name: 'Skull', side: 'ct', items: ['classified', 'covert', 'knife'] },
        gameId: 12,
        winner: 'opponent',
      },
      {
        host: { avatar: 'user2', name: 'Quinn', side: 'ct', items: [ 'covert', 'knife'] },
        opponent: { avatar: 'user6', name: 'Jordan', side: 't', items: ['classified', 'covert', 'knife'] },
        gameId: 13,
        winner: 'host'
      },
      {
        host: { avatar: 'user4', name: 'Blake', side: 't', items: ['classified', 'knife'] },
        opponent: { avatar: 'user8', name: 'StarryKnight', side: 'ct', items: [ 'covert', 'knife'] },
        gameId: 14,
        winner: 'host'
      },
      {
        host: { avatar: 'user7', name: 'Blake', side: 't', items: ['classified'] },
        opponent: { avatar: 'user4', name: 'Avery', side: 'ct', items: ['classified', 'covert', 'knife'] },
        gameId: 15,
        winner: 'opponent'
      },
      {
        host: { avatar: 'user6', name: 'Jordan', side: 't', items: ['covert', 'knife'] },
        opponent: { avatar: 'user3', name: 'Alex', side: 'ct', items: ['classified', 'covert', 'knife'] },
        gameId: 16,
        winner: 'host'
      },
      {
        host: { avatar: 'user8', name: 'StarryKnight', side: 'ct', items: ['classified', 'covert', 'knife'] },
        opponent: { avatar: 'user7', name: 'Quinn', side: 't', items: ['classified', 'knife'] },
        gameId: 17,
        winner: 'host'
      },
      {
        host: { avatar: 'user4', name: 'Morgan', side: 'ct', items: ['covert', 'knife'] },
        opponent: { avatar: 'user7', name: 'Alex', side: 't', items: ['classified', 'covert', 'knife'] },
        gameId: 18,
        winner: 'host'
      },
      {
        host: { avatar: 'user4', name: 'Morgan', side: 'ct', items: ['classified', 'covert', 'knife','classified','classified'] },
        opponent: { avatar: 'user7', name: 'Alex', side: 't', items: ['classified', 'covert', 'knife','classified','classified'] },
        gameId: 18,
        winner: 'host'
      }
    ];

    lobbyGames.forEach((game, index) => {
      setTimeout(() => {
        this.lobbyItems.push(game);
      }, 1000 * index);
    });
  },
});

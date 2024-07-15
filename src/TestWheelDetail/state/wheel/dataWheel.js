import { reactive } from 'vue';

export const dataWheel = reactive({
  colors: {
    blue: '#188BCC',
    yellow: '#E9A653',
    red: '#DD464A',
    green: '#28B54F',
  },
  sequence: [
    'blue', // 0
    'blue', // 1
    'yellow', // 2
    'blue', // 3
    'green',// 4
    'yellow', // 5
    'blue', // 6
    'blue', // 7
    'yellow', // 8
    'red',  // 9
    'blue', // 10
    'blue', // 11
    'yellow', // 12
    'blue', // 13
    'blue', // 14
    'red',  // 15
    'yellow', // 16
    'blue', // 17
    'yellow', // 18
    'blue', // 19
    'yellow', // 20
    'blue', // 21
    'yellow', // 22
    'red',  // 23
  ],
  historyItems: [
    {
      gameId: 1,
      winner: 'blue',
      winnerIndex: 21,
      blueSide: [
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified','classified'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: ['classified','classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
    },
    {
      gameId: 2,
      winner: 'yellow',
      winnerIndex: 20,
      blueSide: [
        {
          name: 'StarryKnight',
          avatar: 'user8',
          bet: 528.89,
          items: ['knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified','classified', 'classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: ['classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert'],
        },
      ],
    },
    {
      gameId: 3,
      winner: 'red',
      winnerIndex: 23,
      blueSide: [
        {
          name: 'StarryKnight',
          avatar: 'user8',
          bet: 528.89,
          items: ['knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified', 'covert', 'knife','classified','classified', 'classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified','classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified', 'covert'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: [ 'knife','classified','classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
    },
    {
      gameId: 4,
      winner: 'green',
      winnerIndex: 4,
      blueSide: [
        {
          name: 'StarryKnight',
          avatar: 'user8',
          bet: 528.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
    },
    {
      gameId: 5,
      winner: 'yellow',
      winnerIndex: 12,
      blueSide: [
        {
          name: 'StarryKnight',
          avatar: 'user8',
          bet: 528.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
    },
    {
      gameId: 6,
      winner: 'blue',
      winnerIndex: 13,
      blueSide: [
        {
          name: 'StarryKnight',
          avatar: 'user8',
          bet: 528.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
    },
    {
      gameId: 7,
      winner: 'blue',
      winnerIndex: 13,
      blueSide: [
        {
          name: 'StarryKnight',
          avatar: 'user8',
          bet: 528.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
    },
    {
      gameId: 8,
      winner: 'yellow',
      winnerIndex: 2,
      blueSide: [
        {
          name: 'StarryKnight',
          avatar: 'user8',
          bet: 528.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
    },
    {
      gameId: 9,
      winner: 'blue',
      winnerIndex: 11,
      blueSide: [
        {
          name: 'StarryKnight',
          avatar: 'user8',
          bet: 528.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
    },
    {
      gameId: 10,
      winner: null,
      winnerIndex: null,
      blueSide: [],
      yellowSide: [],
      redSide: [],
      greenSide: [],
    },
  ],
  fillLastGame() {
    const lastGameIndex = this.historyItems.length - 1;

    const playersToAdd = {
      blueSide: [
        {
          name: 'StarryKnight',
          avatar: 'user8',
          bet: 528.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user2',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      yellowSide: [
        {
          name: 'Starry',
          avatar: 'user3',
          bet: 5280.89,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mike',
          avatar: 'user4',
          bet: 457.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Artorias',
          avatar: 'user5',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },

        {
          name: 'Miks',
          avatar: 'user6',
          bet: 45.12,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Arto',
          avatar: 'user7',
          bet: 264.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
      redSide: [],
      greenSide: [
        {
          name: 'Mice',
          avatar: 'user7',
          bet: 80.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
        {
          name: 'Mices',
          avatar: 'user3',
          bet: 865.23,
          items: ['classified', 'covert', 'knife','classified','classified'],
        },
      ],
    };

    const sides = ['blueSide', 'yellowSide', 'redSide', 'greenSide'];

    sides.forEach(side => {
      playersToAdd[side].forEach((player, index) => {
        setTimeout(() => {
          this.historyItems[lastGameIndex][side].push(player);
          this.updateGameDetails();
        }, 500 * index);
      });
    });
  },
  updateGameDetails() {
    this.historyItems.forEach(game => {
      game.bank = 0;
      game.allPlayers = 0;
      game.allItems = [];

      game.blueBank = 0;
      game.yellowBank = 0;
      game.redBank = 0;
      game.greenBank = 0;

      const sides = ['blueSide', 'yellowSide', 'redSide', 'greenSide'];
      sides.forEach(side => {
        const totalBets = game[side].reduce((acc, curr) => {
          game.allItems = [...game.allItems, ...curr.items];
          return acc + curr.bet;
        }, 0);

        game.bank += totalBets;
        game.allPlayers += game[side].length;

        const formattedTotalBets = Number(totalBets.toFixed(2));

        if (side === 'blueSide') {
          game.blueBank = formattedTotalBets;
        } else if (side === 'yellowSide') {
          game.yellowBank = formattedTotalBets;
        } else if (side === 'redSide') {
          game.redBank = formattedTotalBets;
        } else if (side === 'greenSide') {
          game.greenBank = formattedTotalBets;
        }
      });
      game.bank = Number(game.bank.toFixed(2));
    });
  },
  setLastGameWinner(newWinner, newWinnerIndex) {
    const lastGameIndex = this.historyItems.length - 1;

    if (lastGameIndex >= '') {
      this.historyItems[lastGameIndex].winner = newWinner;
      this.historyItems[lastGameIndex].winnerIndex = newWinnerIndex;
    }
  },
});

dataWheel.updateGameDetails();

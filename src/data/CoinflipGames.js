export const coinflipGamesData = {
    completedGames: [
        {
            id: 1,
            date: '2024-07-15T12:34:56',
            players: 2,
            items: [
                { image_url: 'https://via.placeholder.com/100', name: 'Item 1', rarity: 'Common', price: 100 },
                { image_url: 'https://via.placeholder.com/100', name: 'Item 2', rarity: 'Rare', price: 200 },
            ],
            winner: 'STEAM_0:1:12345678',
            winner_ticket: 123456,
            game_value: 300,
        },
    ],
    activeGames: [
        {
            id: 2,
            date: '2024-07-16T14:20:00',
            players: 2,
            items: [
                { image_url: 'https://via.placeholder.com/100', name: 'Item 3', rarity: 'Epic', price: 300 },
                { image_url: 'https://via.placeholder.com/100', name: 'Item 4', rarity: 'Legendary', price: 400 },
            ],
            winner_ticket: 654321,
            game_value: 700,
        },
    ],
};

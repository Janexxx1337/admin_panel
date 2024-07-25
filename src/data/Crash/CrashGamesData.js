const item = 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ08mlhJO0k_jzNKLummJW4NE_iLGVpN-n3Qfs-RFtY2DzIo-TIFM8Ml7Zqwfow7js08W-vprAn3I16T5iuygX9mc8ew';

function generateCrashGameData(count, startDate, isCompleted = true) {
    const games = [];
    for (let i = 1; i <= count; i++) {
        const date = new Date(startDate);
        date.setHours(date.getHours() + i);

        const game = {
            game_id: i,
            date: date.toISOString(),
            x2_wins: [
                {
                    steamID: `STEAM_0:1:${12345678 + i}`,
                    quantity: 2,
                    status: 'won',
                    time: date.toISOString(),
                    total: 200,
                    weapon_id: '11123',
                    weapon_img: item,
                    amount: 300,
                },
            ],
            x3_wins: [
                {
                    steamID: `STEAM_0:1:${12345678 + i}`,
                    quantity: 2,
                    status: 'won',
                    time: date.toISOString(),
                    total: 200,
                    weapon_id: '11123',
                    weapon_img: item,
                    amount: 300,
                },
            ],
            x5_wins: [
                {
                    steamID: `STEAM_0:1:${12345678 + i}`,
                    quantity: 2,
                    status: 'won',
                    time: date.toISOString(),
                    total: 200,
                    weapon_id: '11123',
                    weapon_img: item,
                    amount: 300,
                },
            ],
            x50_wins: [
                {
                    steamID: `STEAM_0:1:${12345678 + i}`,
                    quantity: 2,
                    status: 'won',
                    time: date.toISOString(),
                    total: 200,
                    weapon_id: '11123',
                    weapon_img: item,
                    amount: 300,
                },
            ],
            x2_losses: [
                {
                    steamID: `STEAM_0:1:${22345678 + i}`,
                    quantity: 1,
                    status: 'lost',
                    time: date.toISOString(),
                    total: 100,
                    weapon_id: '11124',
                    weapon_img: item,
                    amount: 150,
                },
            ],
            x3_losses: [
                {
                    steamID: `STEAM_0:1:${22345678 + i}`,
                    quantity: 1,
                    status: 'lost',
                    time: date.toISOString(),
                    total: 100,
                    weapon_id: '11124',
                    weapon_img: item,
                    amount: 150,
                },
            ],
            players: 4 + i,
            winner: `STEAM_0:1:${12345678 + i}`,
            winner_ticket: 123456 + i,
            game_value: 1000 + (i * 100),
        };

        if (!isCompleted) {
            delete game.winner;
        }

        games.push(game);
    }
    return games;
}

export const crashGamesData = {
    completedGames: generateCrashGameData(10, '2024-07-15T12:34:56', true),
    activeGames: generateCrashGameData(10, '2024-07-16T14:20:00', false),
};

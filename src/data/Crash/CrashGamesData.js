const placeholderItem = 'https://via.placeholder.com/100';

function generateCrashGameData(count, startDate, isCompleted = true) {
    const games = [];
    for (let i = 1; i <= count; i++) {
        const date = new Date(startDate);
        date.setHours(date.getHours() + i);

        const game = {
            game_id: i,
            date: "25.07.2024, 14:49:46", // Преобразуем дату в читаемый формат
            game_value: 300 + (i * 10),
            x2_wins: [
                { weapon_id: i * 2 - 1, weapon_img: placeholderItem, amount: 100, time: date.toLocaleString() },
                { weapon_id: i * 2, weapon_img: placeholderItem, amount: 200, time: date.toLocaleString() },
            ],
            x3_wins: [
                { weapon_id: i * 3 - 2, weapon_img: placeholderItem, amount: 300, time: date.toLocaleString() },
                { weapon_id: i * 3 - 1, weapon_img: placeholderItem, amount: 400, time: date.toLocaleString() },
            ],
            x5_wins: [
                { weapon_id: i * 5, weapon_img: placeholderItem, amount: 500, time: date.toLocaleString() },
            ],
            x50_wins: [],
            players: 4 + i,
            winner: `STEAM_0:1:${12345678 + i}`,
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

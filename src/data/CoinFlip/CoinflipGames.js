export const generateCoinflipGamesData = (numCompleted = 10, numActive = 10) => {
    const generateGame = (id, date, players, winner, winner_ticket, game_value) => ({
        id,
        date,
        players,
        winner,
        winner_ticket,
        game_value,
    });

    const completedGames = [];
    const activeGames = [];

    for (let i = 1; i <= numCompleted; i++) {
        completedGames.push(generateGame(
            i,
            `2024-07-15T12:${34 + i}:56`,
            2 + (i % 3),
            `STEAM_0:1:12345${678 + i}`,
            123456 + i,
            300 + (i * 10)
        ));
    }

    for (let i = 1; i <= numActive; i++) {
        activeGames.push(generateGame(
            numCompleted + i,
            `2024-07-16T14:${20 + i}:00`,
            2 + (i % 3),
            null,
            654321 + i,
            700 + (i * 20)
        ));
    }

    return {
        completedGames,
        activeGames,
    };
};

export const coinflipGamesData = generateCoinflipGamesData(10, 10);

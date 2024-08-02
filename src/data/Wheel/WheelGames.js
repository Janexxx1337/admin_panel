const placeholderItem = 'https://via.placeholder.com/100';

// Массив с именами пользователей
const userNames = [
    'Alex',
    'Chris',
    'Jordan',
    'Taylor',
    'Morgan',
    'Casey',
    'Riley',
    'Jamie',
    'Avery',
    'Peyton',
];

// Функция для случайного выбора имени из массива
function getRandomUsername() {
    const randomIndex = Math.floor(Math.random() * userNames.length);
    return userNames[randomIndex];
}

// Функция для генерации steamID с именем пользователя
function generateSteamIDWithUsername(baseSteamID) {
    const username = getRandomUsername();
    return `${baseSteamID}|${username}`;
}

function generateWheelGameData(count, startDate, isCompleted = true) {
    const games = [];
    for (let i = 1; i <= count; i++) {
        const date = new Date(startDate);
        date.setHours(date.getHours() + i);

        // Генерация steamID с именем пользователя
        const winnerSteamID = generateSteamIDWithUsername(`STEAM_0:1:${12345678 + i}`);

        const game = {
            game_id: i,
            date: date.toISOString(),
            game_value: 300 + i * 10,
            x2_wins: [
                { image_url: placeholderItem, name: `Item ${i * 2 - 1}`, rarity: 'Common', price: 100 },
                { image_url: placeholderItem, name: `Item ${i * 2}`, rarity: 'Rare', price: 200 },
            ],
            x3_wins: [
                { image_url: placeholderItem, name: `Item ${i * 3 - 2}`, rarity: 'Epic', price: 300 },
                { image_url: placeholderItem, name: `Item ${i * 3 - 1}`, rarity: 'Legendary', price: 400 },
            ],
            x5_wins: [
                { image_url: placeholderItem, name: `Item ${i * 5}`, rarity: 'Common', price: 500 },
            ],
            x50_wins: [],
            players: 4 + i,
            winner: winnerSteamID,
        };

        if (!isCompleted) {
            delete game.winner;
        }

        games.push(game);
    }
    return games;
}

export const wheelGamesData = {
    completedGames: generateWheelGameData(10, '2024-07-15T12:34:56', true),
    activeGames: generateWheelGameData(10, '2024-07-16T14:20:00', false),
};

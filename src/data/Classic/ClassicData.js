const item =
    'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ08mlhJO0k_jzNKLummJW4NE_iLGVpN-n3Qfs-RFtY2DzIo-TIFM8Ml7Zqwfow7js08W-vprAn3I16T5iuygX9mc8ew';

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

function generateGameData(count, startDate, isCompleted = true) {
    const games = [];
    for (let i = 1; i <= count; i++) {
        const date = new Date(startDate);
        date.setHours(date.getHours() + i);

        const steamID = `STEAM_0:1:${12345678 + i}`;
        const username = getRandomUsername();
        const steamIDWithUsername = `${steamID}|${username}`; // Включаем имя пользователя внутрь steamID

        const game = {
            game_id: i,
            date: date.toISOString(),
            x2_wins: [
                {
                    steamID: steamIDWithUsername,
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
                    steamID: steamIDWithUsername,
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
                    steamID: steamIDWithUsername,
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
                    steamID: steamIDWithUsername,
                    quantity: 2,
                    status: 'won',
                    time: date.toISOString(),
                    total: 200,
                    weapon_id: '11123',
                    weapon_img: item,
                    amount: 300,
                },
            ],
            players: 4 + i,
            winner: steamIDWithUsername,
            winner_ticket: 123456 + i,
            game_value: 1000 + i * 100,
        };

        if (!isCompleted) {
            delete game.winner;
        }

        games.push(game);
    }
    return games;
}

export const classicGamesData = {
    completedGames: generateGameData(10, '2024-07-15T12:34:56', true),
    activeGames: generateGameData(10, '2024-07-16T14:20:00', false),
};

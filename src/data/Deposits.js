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

export const depositsData = [
    {
        id: 1,
        amount: 100,
        provider: 'Provider1',
        date: '2024-07-15',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:12345678'),
    },
    {
        id: 2,
        amount: 200,
        provider: 'Provider2',
        date: '2024-07-16',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:87654321'),
    },
    {
        id: 3,
        amount: 300,
        provider: 'Provider1',
        date: '2024-07-17',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:23456789'),
    },
    {
        id: 4,
        amount: 400,
        provider: 'Provider3',
        date: '2024-07-18',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:98765432'),
    },
    {
        id: 5,
        amount: 500,
        provider: 'Provider2',
        date: '2024-07-19',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:34567890'),
    },
];

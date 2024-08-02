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

export const usersData = [
    {
        id: 1,
        steam_id: generateSteamIDWithUsername('STEAM_0:1:12345678'),
        balance: 100,
        payment_status: 'completed',
        banned: false,
    },
    {
        id: 2,
        steam_id: generateSteamIDWithUsername('STEAM_0:1:87654321'),
        balance: 200,
        payment_status: 'pending',
        banned: true,
    },
    {
        id: 3,
        steam_id: generateSteamIDWithUsername('STEAM_0:1:23456789'),
        balance: 300,
        payment_status: 'completed',
        banned: false,
    },
    {
        id: 4,
        steam_id: generateSteamIDWithUsername('STEAM_0:1:98765432'),
        balance: 400,
        payment_status: 'pending',
        banned: true,
    },
    {
        id: 5,
        steam_id: generateSteamIDWithUsername('STEAM_0:1:34567890'),
        balance: 500,
        payment_status: 'completed',
        banned: false,
    },
];

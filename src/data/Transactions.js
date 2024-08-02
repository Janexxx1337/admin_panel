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

export const transactions = [
    {
        id: '1',
        date: '2024-07-15 12:34:56',
        type: 'Бонусные баллы',
        steamID: generateSteamIDWithUsername('STEAM_0:1:12345678'),
        items: [
            { name: 'Item 1', rarity: 'Common', price: 100 },
            { name: 'Item 2', rarity: 'Rare', price: 200 },
        ],
    },
    {
        id: '2',
        date: '2024-07-15 13:00:00',
        type: 'Начисление',
        steamID: generateSteamIDWithUsername('STEAM_0:1:23456789'),
        items: [
            { name: 'Item 3', rarity: 'Epic', price: 300 },
            { name: 'Item 4', rarity: 'Legendary', price: 400 },
        ],
    },
    {
        id: '3',
        date: '2024-07-15 13:15:00',
        type: 'Начисление',
        steamID: generateSteamIDWithUsername('STEAM_0:1:23456789'),
        items: [
            { name: 'Item 5', rarity: 'Epic', price: 300 },
            { name: 'Item 6', rarity: 'Legendary', price: 400 },
        ],
    },
];

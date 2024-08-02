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

export const withdrawalsData = [
    {
        id: 1,
        item_name: 'Item 1',
        status: 'completed',
        request_date: '2024-07-15',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:12345678'),
        provider: 'Provider1',
    },
    {
        id: 2,
        item_name: 'Item 2',
        status: 'pending',
        request_date: '2024-07-14',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:87654321'),
        provider: 'Provider2',
    },
    {
        id: 3,
        item_name: 'Item 3',
        status: 'completed',
        request_date: '2024-07-13',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:23456789'),
        provider: 'Provider1',
    },
    {
        id: 4,
        item_name: 'Item 4',
        status: 'pending',
        request_date: '2024-07-12',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:98765432'),
        provider: 'Provider3',
    },
    {
        id: 5,
        item_name: 'Item 5',
        status: 'completed',
        request_date: '2024-07-11',
        user_steam_id: generateSteamIDWithUsername('STEAM_0:1:34567890'),
        provider: 'Provider2',
    },
];

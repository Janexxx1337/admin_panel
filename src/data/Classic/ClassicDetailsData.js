const item = 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ08mlhJO0k_jzNKLummJW4NE_iLGVpN-n3Qfs-RFtY2DzIo-TIFM8Ml7Zqwfow7js08W-vprAn3I16T5iuygX9mc8ew'

export const items = [
    {
        game_id: 1,
        bet: 'T',
        items: [
            {
                steamID: 'STEAM_0:1:12345678',
                quantity: 2,
                status: 'won',
                time: '2023-07-15 12:34:56',
                total: 200,
                weapon_id: '11123',
                weapon_img: item,
                amount: 300,
            },
        ],
    },
    {
        game_id: 2,
        bet: 'T',
        items: [
            {
                steamID: 'STEAM_0:1:12345678',
                quantity: 2,
                status: 'won',
                time: '2023-07-15 12:34:56',
                total: 200,
                weapon_id: '11123',
                weapon_img: item,
                amount: 300,
            },
        ],
    },
    {
        game_id: 3,
        bet: 'CT',
        items: [
            {
                steamID: 'STEAM_0:1:12345678',
                quantity: 2,
                status: 'won',
                time: '2023-07-15 12:34:56',
                total: 200,
                weapon_id: '11123',
                weapon_img: item,
                amount: 300,
            },
        ],
    },
    {
        game_id: 4,
        bet: 'CT',
        items: [
            {
                steamID: 'STEAM_0:1:12345678',
                quantity: 2,
                status: 'won',
                time: '2023-07-15 12:34:56',
                total: 200,
                weapon_id: '11123',
                weapon_img: item,
                amount: 300,
            },
        ],
    },
];

export const winningItems = [
    {
        game_id: 5,
        steamID: 'STEAM_0:1:56789012',
        quantity: 1,
        bet: 'X5',
        status: 'won',
        time: '2023-07-15 14:15:30',
        total: 600,
        weapon_id: '7890',
        weapon_img: item,
        amount: 500,
    },
];

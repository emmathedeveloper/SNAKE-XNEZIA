
export const Themes = [
    {
        name: 'Classic Apple',
        background_color: 'bg-[#373737]',
        snake_color: 'bg-green-500',
        food: '🍎',
        food_to_unlock: null
    },
    {
        name: 'Yellow Melon',
        background_color: 'bg-yellow-500',
        snake_color: 'bg-black',
        food: '🍉',
        food_to_unlock: [
            {
                food: '🍎',
                number: 50
            }
        ]
    },
    {
        name: 'Red Orange',
        background_color: 'bg-red-500',
        snake_color: 'bg-white',
        food: '🍊',
        food_to_unlock: [
            {
                food: '🍎',
                number: 30
            },
            {
                food: '🍉',
                number: 100
            },
        ]
    },
    {
        name: 'Fuchsia Almond',
        background_color: 'bg-fuchsia-500',
        snake_color: 'bg-white',
        food: '🍋',
        food_to_unlock: [
            {
                food: '🍎',
                number: 10
            },
            {
                food: '🍉',
                number: 50
            },
            {
                food: '🍊',
                number: 120
            },
        ]
    },
    {
        name: 'Blue Grape',
        background_color: 'bg-blue-500',
        snake_color: 'bg-blue-900',
        food: '🍇',
        food_to_unlock: [
            {
                food: '🍉',
                number: 20
            },
            {
                food: '🍊',
                number: 60
            },
            {
                food: '🍋',
                number: 120
            },
        ]
    },
    {
        name: 'Brown Honey',
        background_color: 'bg-amber-500',
        snake_color: 'bg-amber-900',
        food: '🍯',
        food_to_unlock: [
            {
                food: '🍊',
                number: 15
            },
            {
                food: '🍋',
                number: 70
            },
            {
                food: '🍇',
                number: 125
            },
        ]
    },
    {
        name: 'Purple Sandwich',
        background_color: 'bg-purple-500',
        snake_color: 'bg-purple-900',
        food: '🥪',
        food_to_unlock: [
            {
                food: '🍋',
                number: 30
            },
            {
                food: '🍇',
                number: 45
            },
            {
                food: '🍯',
                number: 150
            },
        ]
    },
    {
        name: 'Green Pizza',
        background_color: 'bg-green-500',
        snake_color: 'bg-green-900',
        food: '🍕',
        food_to_unlock: [
            {
                food: '🍇',
                number: 40
            },
            {
                food: '🍯',
                number: 80
            },
            {
                food: '🥪',
                number: 160
            },
        ]
    },
    {
        name: 'Slate Egg',
        background_color: 'bg-slate-500',
        snake_color: 'bg-slate-900',
        food: '🥚',
        food_to_unlock: [
            {
                food: '🍯',
                number: 50
            },
            {
                food: '🥪',
                number: 85
            },
            {
                food: '🍕',
                number: 165
            },
        ]
    },
    {
        name: 'Pink Candy',
        background_color: 'bg-pink-500',
        snake_color: 'bg-pink-900',
        food: '🍬',
        food_to_unlock: [
            {
                food: '🥪',
                number: 60
            },
            {
                food: '🍕',
                number: 95
            },
            {
                food: '🥚',
                number: 180
            },
        ]
    },
    {
        name: 'Emerald Cheese',
        background_color: 'bg-emerald-500',
        snake_color: 'bg-emerald-900',
        food: '🧀',
        food_to_unlock: [
            {
                food: '🍕',
                number: 70
            },
            {
                food: '🥚',
                number: 100
            },
            {
                food: '🍬',
                number: 190
            },
        ]
    },
    {
        name: 'Cyan Pretzel',
        background_color: 'bg-cyan-500',
        snake_color: 'bg-cyan-900',
        food: '🥨',
        food_to_unlock: [
            {
                food: '🥚',
                number: 75
            },
            {
                food: '🍬',
                number: 110
            },
            {
                food: '🧀',
                number: 200
            },
        ]
    },
    {
        name: 'Lime Shortcake',
        background_color: 'bg-lime-500',
        snake_color: 'bg-lime-900',
        food: '🍰',
        food_to_unlock: [
            {
                food: '🍬',
                number: 100
            },
            {
                food: '🧀',
                number: 120
            },
            {
                food: '🥨',
                number: 250
            },
        ]
    },
]
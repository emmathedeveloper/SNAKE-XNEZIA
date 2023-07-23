
import { writable, type Writable } from "svelte/store";


export const isDark = writable(true)

export const high_score = writable(0)

export const gameThemeData: Writable<number> | Writable<null> = writable(0)

export const unlockedThemes: Writable<any[]> = writable([0])

export const titleBarHidden = writable(false)

const initial = [
    {
        food: '🍎',
        total: 0,
    },
    {
        food: '🍉',
        total: 0,
    },
    {
        food: '🍊',
        total: 0,
    },
    {
        food: '🍋',
        total: 0,
    },
    {
        food: '🍇',
        total: 0,
    },
    {
        food: '🍯',
        total: 0,
    },
    {
        food: '🥪',
        total: 0,
    },
    {
        food: '🍕',
        total: 0,
    },
    {
        food: '🥚',
        total: 0,
    },
    {
        food: '🍬',
        total: 0,
    },
    {
        food: '🧀',
        total: 0,
    },
    {
        food: '🥨',
        total: 0,
    },
    {
        food: '🍰',
        total: 0,
    },
]

export const inventory = writable(initial)

if(JSON.parse(localStorage.getItem("high_score") || '0')){
    high_score.set(JSON.parse(localStorage.getItem("high_score") || '0'))
}

if(JSON.parse(localStorage.getItem("game_theme_data") || '0')){
    gameThemeData.set(JSON.parse(localStorage.getItem("game_theme_data") || '0'))
}

if(JSON.parse(localStorage.getItem("unlocked_themes") || '[0]')){
    unlockedThemes.set(JSON.parse(localStorage.getItem("unlocked_themes") || '[0]'))
}

if(JSON.parse(localStorage.getItem("inventory") || '[]')){
    inventory.set(JSON.parse(localStorage.getItem("inventory") || JSON.stringify(initial)))
}

isDark.subscribe((value) => {
    if(value) return document.body.classList.add('dark')

    document.body.classList.remove('dark')
})

high_score.subscribe(value => {
    localStorage.setItem('high_score', JSON.stringify(value))
})

gameThemeData.subscribe(value => {
    localStorage.setItem('game_theme_data', JSON.stringify(value))
})

unlockedThemes.subscribe(value => {
    localStorage.setItem('unlocked_themes', JSON.stringify(value))
})

inventory.subscribe(value => {
    localStorage.setItem('inventory', JSON.stringify(value))
})
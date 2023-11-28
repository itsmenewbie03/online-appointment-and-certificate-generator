export { matchers } from './matchers.js'

export const nodes = [
    () => import('./nodes/0'),
    () => import('./nodes/1'),
    () => import('./nodes/2'),
    () => import('./nodes/3'),
    () => import('./nodes/4'),
    () => import('./nodes/5'),
    () => import('./nodes/6'),
    () => import('./nodes/7'),
]

export const server_loads = []

export const dictionary = {
    '/(app)': [3, [2]],
    '/(app)/create': [4, [2]],
    '/(app)/home': [5, [2]],
    '/(auth)/login': [~7],
    '/(app)/resident-db': [6, [2]],
}

export const hooks = {
    handleError: ({ error }) => {
        console.error(error)
    },
}

export { default as root } from '../root.svelte'

import { writable } from 'svelte/store'
import { AppData } from '../../consts/ipc'

export const appData = writable<AppData>()

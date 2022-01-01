import { writable } from 'svelte/store'
import { appData as AppData } from '../../consts/ipc'

export const appData = writable<AppData>()

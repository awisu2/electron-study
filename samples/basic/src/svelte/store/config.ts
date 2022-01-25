import { writable } from 'svelte/store'
import { Config } from '../../consts/ipc'

export const config = writable<Config>()

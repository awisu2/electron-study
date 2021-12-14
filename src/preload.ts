import {contextBridge} from "electron"
import render from './react/render'

// windows.apiにpreload
export class ContextBridgeApi {
    public static readonly API_KEY = "api"

    render = () => {
        render()
    }
}

contextBridge.exposeInMainWorld(ContextBridgeApi.API_KEY, new ContextBridgeApi())

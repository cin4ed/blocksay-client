import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import ServerController from '../lib/ServerController'

// Exposed API for renderer
const blocksay = {
  servers: {
    add: ServerController.add,
    getAll: ServerController.getAll,
    delete: ServerController.delete
  },
  messages: {
    add: ServerController.addMessage,
    getAllBy: ServerController.getAllMessages
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('blocksay', blocksay)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.blocksay = blocksay
}

import { app, BrowserWindow, ipcMain } from 'electron';
let mainWindow: BrowserWindow | null;
const path = require("path");

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const assetsPath = process.env.NODE_ENV === "development" ? 
path.join(process.cwd(), "assets") : 
path.join(process.resourcesPath, 'assets');

function createWindow () {
    mainWindow = new BrowserWindow({
        icon: path.join(assetsPath, 'task-logo.ico'),
        title: "Taskpomo",
        width: 1100,
        height: 700,
        webPreferences: {  
            webSecurity: false,
            nodeIntegration: true,  
            enableRemoteModule: true,  
            contextIsolation: false,  
            nodeIntegrationInWorker: true,  
            nodeIntegrationInSubFrames: true
        },
        autoHideMenuBar: process.env.NODE_ENV === "production"
    })

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

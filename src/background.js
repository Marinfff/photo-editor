import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import {
  app,
  protocol,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  globalShortcut
} from 'electron';

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true,
  },
}]);

class App {
  constructor() {
    this.window = null;
    this.tray = null;
  }

  getWindow() {
    return this.window;
  }

  createWindow() {
    this.window = new BrowserWindow({
      width: 1450,
      height: 800,
      minWidth: 1400,
      minHeight: 800,
      title: 'My app',
      transparent: true,
      frame: false,
      icon: `src/assets/server.png`,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    } else {
      createProtocol('app');
      this.window.loadURL('app://./index.html');
    }

    this.window.on('closed', () => {
      this.window = null;
    });
  }

  createTray() {
    this.tray = new Tray(`src/assets/server.png`);
    const instance = this;
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open',
        click() {
          instance.window.show();
        },
      },
      {
        label: 'Close',
        click() {
          instance.window.close();
        },
      },
    ]);
    this.tray.setToolTip('This is my application.');
    this.tray.setContextMenu(contextMenu);

    this.tray.on('click', () => {
      this.window.show();
      this.tray.setImage(`src/assets/server.png`)
    });
  }

  registerAppHandler() {
    app.on('activate', () => {
      if (this.window === null) {
        this.createWindow();
        this.createTray();
      }
    });

    app.on('ready', () => {
      this.createWindow();
      this.createTray();
      this.registerGlobalShortcut();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
  }

  registerGlobalShortcut () {
    globalShortcut.register('Control+Alt+D', () => {
      this.window.show();
    });
    globalShortcut.register('Control+Alt+Z', () => {
      this.window.minimize();
    })
  }


  registerIpcMainHandler() {
    ipcMain.on('maximize', () => {
      if (!this.window.isFullScreen()) {
        this.window.maximize();
      }
    });

    ipcMain.on('minimize', () => {
      this.window.minimize();
    });

    ipcMain.on('modifyIcon', () => {
      this.tray.setImage(`src/assets/database.png`)
    });
    ipcMain.on('show', () => {
      this.window.show();
    });

    ipcMain.on('close', () => {
      this.window.hide();
    });
    ipcMain.on('show', () => {
      this.window.show();
    });
  }

  init() {
    this.registerAppHandler();
    this.registerIpcMainHandler();
  }
}

const application = new App();
application.init();

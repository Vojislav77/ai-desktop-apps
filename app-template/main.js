const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
let win, tray;
const configFile = path.join(app.getPath('userData'), 'qwen-window-state.json');

function getWindowState() {
  try {
    return JSON.parse(fs.readFileSync(configFile, 'utf8'));
  } catch {
    return { width: 1200, height: 800 };
  }
}

function saveWindowState() {
  if (win) {
    const bounds = win.getBounds();
    fs.writeFileSync(configFile, JSON.stringify({ width: bounds.width, height: bounds.height }));
  }
}

app.whenReady().then(() => {
  app.setName('Qwen');
  app.setAppUserModelId('com.qwen.app');

  const state = getWindowState();
  const iconPath = path.join(__dirname, 'icon.png');
  const icon = nativeImage.createFromPath(iconPath);

  win = new BrowserWindow({
    width: state.width,
    height: state.height,
    icon: iconPath,
    show: true
  });

  win.loadURL('https://chat.qwen.ai/');
  win.setIcon(iconPath);

  win.on('resize', saveWindowState);
  win.on('move', saveWindowState);

  const trayIcon = icon.resize({ width: 22, height: 22 });
  tray = new Tray(trayIcon);
  tray.setToolTip('Qwen');

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: () => win.show() },
                                             { label: 'Quit', click: () => { saveWindowState(); app.exit(); } }
  ]);
  tray.setContextMenu(contextMenu);
  tray.on('click', () => win.show());

  win.on('close', (event) => {
    event.preventDefault();
    win.hide();
  });
});

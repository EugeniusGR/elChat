const electron = require('electron');
const electronDl = require('electron-dl');

const { getImages, downloadImages, getPath } =  require('./electronProccess/getImages');
const { app, BrowserWindow, ipcMain, Menu } = electron;

electronDl();

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    // frame: false,
  });
  mainWindow.loadFile('src/index.html');


  const template = [
    {
      role: 'fileMenu',
      submenu: [
        {
          label: 'setPath',
          click: async () => {
            const path = await getPath();
            if(path){
              mainWindow.webContents.send('savePath', path);
            }
          }
        }
      ]
    },
    
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);


});

ipcMain.on('show-context-menu', (event) => {
  const template = [
    {
      label: 'setPath',
      click: async () => {
        const path = await getPath();
        if(path){
          mainWindow.webContents.send('savePath', path);
        }
      }
    },
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
})


ipcMain.on('getImages', async(event, url) => {
  console.log('get');
  const imagesURL = await getImages(url);
  mainWindow.webContents.send('sendImages', imagesURL);
})

ipcMain.on('getPath', async(event) => {
  console.log('path');
  const path = await getPath();
  if(path){
    mainWindow.webContents.send('savePath', path);
  }
})

ipcMain.on('downloadImage', async(event, data) => {
  console.log('download');
  await downloadImages(data.url, data.path);
})


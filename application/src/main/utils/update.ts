import { EventsType } from '../../dto/Events';
import { ipcMain, ipcRenderer } from 'electron';
import log from 'electron-log';
import { NsisUpdater } from 'electron-updater';
import config from '../config';
import env from '../../env';

const autoUpdater = new NsisUpdater({
  provider: 'generic' as any,
  url: env.UPDATE_URL,
});

if (process.env.NODE_ENV === 'production') {
  log.transports.file.level = 'info';
} else {
  log.transports.file.level = 'debug';
}
autoUpdater.forceDevUpdateConfig = false;
autoUpdater.autoDownload = false;
autoUpdater.logger = log;

autoUpdater.on('checking-for-update', () => {
  log.info('Checking for new update');
});

autoUpdater.on('update-available', (data) => {
  log.info('Update is avaiable sending data to renderer');
  config.mainWindow?.webContents.send(EventsType.SEND_DOWNLOAD_PROGRESS, {
    total: data.files[0].size,
    downloaded: 0,
    percent: 0,
  });
  config.mainWindow?.webContents.send(EventsType.SEND_DOWNLOAD_STATUS, {
    isAvailable: true,
  });
  autoUpdater.downloadUpdate();
});

autoUpdater.on('update-not-available', () => {
  log.info('Update is not avaiable sending data to renderer');
  config.mainWindow?.webContents.send(EventsType.SEND_DOWNLOAD_STATUS, {
    isAvailable: false,
  });

  config.mainWindow?.hide();
  setTimeout(() => {
    config.mainWindow?.setSize(1024, 728);
    config.mainWindow?.center();
    config.mainWindow?.show();
  }, 500);
});

autoUpdater.on('download-progress', (data) => {
  config.mainWindow?.webContents.send(EventsType.SEND_DOWNLOAD_PROGRESS, {
    total: data.total,
    downloaded: data.transferred,
    percent: data.percent,
  });
});

autoUpdater.on('error', (error) => {
  log.error('Error in getting update', error);
  autoUpdater.checkForUpdates();
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update download complete');
  autoUpdater.quitAndInstall();
});

export default autoUpdater;

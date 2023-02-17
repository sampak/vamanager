import { EventsType } from '../../dto/Events';
import { app, ipcMain } from 'electron';
import autoUpdater from '../utils/update';
import config from '../config';

ipcMain.on(EventsType.CHECK_IS_UPDATE, () => {
  if (!autoUpdater.isUpdaterActive()) {
    config.mainWindow?.webContents.send(EventsType.SEND_DOWNLOAD_STATUS, {
      isAvailable: false,
    });
    config.mainWindow?.setSize(1024, 728);
    config.mainWindow?.center();
    return;
  }

  autoUpdater.checkForUpdates();
});

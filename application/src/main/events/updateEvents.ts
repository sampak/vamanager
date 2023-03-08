import { EventsType } from '../../dto/Events';
import { app, ipcMain } from 'electron';
import autoUpdater from '../utils/update';
import config from '../config';

ipcMain.on(EventsType.CHECK_IS_UPDATE, () => {
  setTimeout(() => {
    if (!autoUpdater.isUpdaterActive()) {
      config.mainWindow?.webContents.send(EventsType.SEND_DOWNLOAD_STATUS, {
        isAvailable: false,
      });
      config.mainWindow?.hide();
      setTimeout(() => {
        config.mainWindow?.setSize(1024, 728);
        config.mainWindow?.center();
        config.mainWindow?.show();
      }, 500);
      return;
    }

    autoUpdater.checkForUpdates();
  }, 1000);
});

ipcMain.on(EventsType.SET_WORKSPACE, (_, data) => {
  config.workspaceId = data.workspaceId;
});

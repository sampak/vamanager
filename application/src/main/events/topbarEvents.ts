import { EventsType } from '../../dto/Events';
import { app, ipcMain } from 'electron';
import config from '../config';

ipcMain.on(EventsType.CLOSE_APPLICATION, () => {
  app.quit();
});

ipcMain.on(EventsType.MINIMALIZE_APPLICATION, () => {
  config.mainWindow?.minimize();
});

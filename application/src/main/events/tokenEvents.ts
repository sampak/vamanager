import { EventsType } from '../../dto/Events';
import { ipcMain } from 'electron';
import config from '../config';

ipcMain.on(EventsType.SEND_TOKEN, (event, data: { token: string }) => {
  config.access_token = data.token;
});

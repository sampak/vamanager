import { EventsType } from '../../dto/Events';
import { ipcMain } from 'electron';
import log from 'electron-log';

ipcMain.on(EventsType.CHECK_SIM_STATUS, (event) => {
  log.info('Status of simulator connection: false, sim: ');
  event.reply(EventsType.CHECK_SIM_STATUS, {
    connection: false,
    sim: '',
  });
});

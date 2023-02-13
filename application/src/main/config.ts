import { BrowserWindow } from 'electron';

interface Config {
  access_token: string;
  mainWindow: BrowserWindow | null;
}

const config: Config = {
  access_token: '',
  mainWindow: null,
};

export default config;

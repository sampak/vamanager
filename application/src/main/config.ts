import { BrowserWindow } from 'electron';

interface Config {
  access_token: string;
  workspaceId: string;
  mainWindow: BrowserWindow | null;
}

const config: Config = {
  access_token: '',
  workspaceId: '',
  mainWindow: null,
};

export default config;

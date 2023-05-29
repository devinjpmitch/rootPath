import { getServiceContainer } from '@getflywheel/local/main';

class MyClass {
  private electron: any;
  private fileSystem: any;
  private notifier: any;

  constructor(context: any) {
    const { electron, fileSystem, notifier } = context;
    this.electron = electron;
    this.fileSystem = fileSystem;
    this.notifier = notifier;

    const { ipcMain } = this.electron;
    ipcMain.on('getPath', this.getPath.bind(this));
    ipcMain.on('setPath', this.setPath.bind(this));
  }

  private async getPath(event: any, sitePath: string) {
    let confPath = sitePath + '/conf/nginx/site.conf.hbs';
    confPath = confPath.replace('~', process.env.HOME);
    let root_absolute = sitePath.replace('~', process.env.HOME) + '/app/';
    try {
      await this.fileSystem.readFile(confPath, 'utf8', (error: any, data: string) => {
        let match = data.match(/root\s+"([^"]*)"/);
        if (match) {
          let root = match[1];
          root = root.replace(root_absolute, '');
          event.reply('site-path', root);
        }
      });
    } catch (error) {
      this.notifier.notify({
        title: 'Nginx config failed',
        message: String(error),
      });
    }
  }

  private async setPath(event: any, siteId: string, sitePath: string, rootPath: string) {
    let confPath = sitePath + '/conf/nginx/site.conf.hbs';
    confPath = confPath.replace('~', process.env.HOME);
    let root_absolute = sitePath.replace('~', process.env.HOME) + '/app/' + rootPath;
    try {
      await this.fileSystem.readFile(confPath, 'utf8', (error: any, data: string) => {
        let match = data.match(/root\s+"([^"]*)"/);
        if (match) {
          const root = match[1];
          data = data.replace(root, root_absolute);
          this.fileSystem.writeFile(confPath, data, (error: any) => {
            if (error) throw error;
            getServiceContainer().cradle.localLogger.log('info', `site.conf updated for ${siteId}`);
            this.notifier.notify({
              title: 'Nginx config updated',
              message: `site.conf updated for ${siteId}`,
            });
          });
        }
      });
    } catch (error) {
      this.notifier.notify({
        title: 'Nginx config failed',
        message: String(error),
      });
    }
  }
}

export default MyClass;

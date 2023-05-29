"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("@getflywheel/local/main");
class MyClass {
    constructor(context) {
        const { electron, fileSystem, notifier } = context;
        this.electron = electron;
        this.fileSystem = fileSystem;
        this.notifier = notifier;
        const { ipcMain } = this.electron;
        ipcMain.on('getPath', this.getPath.bind(this));
        ipcMain.on('setPath', this.setPath.bind(this));
    }
    getPath(event, sitePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let confPath = sitePath + '/conf/nginx/site.conf.hbs';
            confPath = confPath.replace('~', process.env.HOME);
            let root_absolute = sitePath.replace('~', process.env.HOME) + '/app/';
            try {
                yield this.fileSystem.readFile(confPath, 'utf8', (error, data) => {
                    let match = data.match(/root\s+"([^"]*)"/);
                    if (match) {
                        let root = match[1];
                        root = root.replace(root_absolute, '');
                        event.reply('site-path', root);
                    }
                });
            }
            catch (error) {
                this.notifier.notify({
                    title: 'Nginx config failed',
                    message: String(error),
                });
            }
        });
    }
    setPath(event, siteId, sitePath, rootPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let confPath = sitePath + '/conf/nginx/site.conf.hbs';
            confPath = confPath.replace('~', process.env.HOME);
            let root_absolute = sitePath.replace('~', process.env.HOME) + '/app/' + rootPath;
            try {
                yield this.fileSystem.readFile(confPath, 'utf8', (error, data) => {
                    let match = data.match(/root\s+"([^"]*)"/);
                    if (match) {
                        const root = match[1];
                        data = data.replace(root, root_absolute);
                        this.fileSystem.writeFile(confPath, data, (error) => {
                            if (error)
                                throw error;
                            main_1.getServiceContainer().cradle.localLogger.log('info', `site.conf updated for ${siteId}`);
                            this.notifier.notify({
                                title: 'Nginx config updated',
                                message: `site.conf updated for ${siteId}`,
                            });
                        });
                    }
                });
            }
            catch (error) {
                this.notifier.notify({
                    title: 'Nginx config failed',
                    message: String(error),
                });
            }
        });
    }
}
exports.default = MyClass;
//# sourceMappingURL=main.js.map
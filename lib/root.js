"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const electron_1 = require("electron");
const local_components_1 = require("@getflywheel/local-components");
class RootPath extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootPath: 'public/',
            updating: false,
        };
    }
    componentDidMount() {
        this.getPath();
    }
    getPath() {
        const { site } = this.props;
        electron_1.ipcRenderer.send('getPath', site.path);
        electron_1.ipcRenderer.once('site-path', (event, sitePath) => {
            this.setState({
                rootPath: sitePath !== null && sitePath !== void 0 ? sitePath : 'public/',
                updating: false,
            });
        });
    }
    setPath() {
        this.setState({ updating: true });
        const { site } = this.props;
        const { rootPath } = this.state;
        electron_1.ipcRenderer.send('setPath', site.id, site.path, rootPath);
        setTimeout(() => {
            this.setState({ updating: false });
            this.getPath();
        }, 2000);
    }
    render() {
        const { rootPath, updating } = this.state;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { class: "rootPath" },
                react_1.default.createElement(local_components_1.Banner, null, "If you wish to use a custom root path, please enter it below."),
                react_1.default.createElement(local_components_1.TableListRow, { key: "rootpath", label: "Root Path" },
                    react_1.default.createElement(local_components_1.BasicInput, { value: rootPath, className: "inputText", onChange: (event) => {
                            this.setState({ rootPath: event.target.value });
                        }, style: { padding: '0.5rem 1rem' } }),
                    react_1.default.createElement(local_components_1.Button, { disabled: updating ? 'true' : '', style: { float: 'right' }, onClick: () => this.setPath() }, updating ? 'Applied' : 'Apply')))));
    }
}
exports.default = RootPath;
//# sourceMappingURL=root.js.map
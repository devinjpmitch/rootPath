"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = __importDefault(require("./root"));
const path_1 = __importDefault(require("path"));
function default_1(context) {
    const { React, hooks } = context;
    const stylesheetPath = path_1.default.resolve(__dirname, '../style.css');
    hooks.addContent('stylesheets', () => React.createElement("link", { rel: "stylesheet", key: "rootstyleesheet", href: stylesheetPath }));
    hooks.addContent('SiteInfoOverview_TableList', (site) => React.createElement(root_1.default, { key: "siteinfo", site: site }));
}
exports.default = default_1;
//# sourceMappingURL=renderer.js.map
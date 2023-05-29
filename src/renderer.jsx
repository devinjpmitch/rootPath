import RootPath from './root';
import path from 'path';
export default function (context) {
	const { React, hooks } = context;
	const stylesheetPath = path.resolve(__dirname, '../style.css');
	hooks.addContent('stylesheets', () => <link rel="stylesheet" key="rootstyleesheet" href={stylesheetPath} />);
	hooks.addContent('SiteInfoOverview_TableList', (site) => <RootPath key="siteinfo" site={site} />);
}
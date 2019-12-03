import { app, BrowserWindow, shell } from 'electron';
import * as Constants from "./constants";

let win: any;

app.on('ready', () => {
	win = new BrowserWindow({
		show: false,
		title: Constants.title
	});
	win.webContents.loadURL(Constants.url);
	win.once('ready-to-show', () => {
		win.show();
	});
	win.on('page-title-updated', (e: Event) => {
		e.preventDefault();
	});
	win.on('app-command', (e: Event, cmd: string) => {
		if (cmd == 'browser-backward' || cmd == 'browser-forward') {
			e.preventDefault();
		}
	});
	win.webContents.on('will-navigate', handleNavigation);
	win.webContents.on('new-window', handleNavigation);
});

function handleNavigation(e: Event, url: string) {
	if (!url.includes(Constants.authUrl)) {
		e.preventDefault();
		shell.openExternal(url);
	}
}
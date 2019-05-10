import { app, BrowserWindow } from 'electron';

let win: any;

app.on('ready', () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		show: false
	});
	win.webContents.loadURL("https://messages.google.com");
	win.once("ready-to-show", () => {
		win.show();
	});
});
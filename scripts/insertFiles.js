let time = (new Date()).getTime();
let update = file => file + "?n=" + time;

function insertCss(file) {
	let css = document.createElement("link"); 
	css.rel = "stylesheet";
	css.href = update(file);

	document.head.appendChild(css);
}

function insertScript(file) {
	document.write("<script src='" + update(file) + "'></script>");
}

let cssfiles = ["./assets/style.css", "./assets/shell.css", "./assets/work.css", "./assets/popup.css", "./assets/mediaQueries.css"];

for (let i=0; i < cssfiles.length; i++)
	 insertCss(cssfiles[i]);

let scripts = ["scripts/class/Shell.js", "scripts/class/WorkList.js", "scripts/class/Work.js", "scripts/db.js", "scripts/commands.js"];

for (let i=0; i < scripts.length; i++)
	insertScript(scripts[i]);
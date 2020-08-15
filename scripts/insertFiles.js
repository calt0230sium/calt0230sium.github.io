let time = (new Date()).getTime();
let update = file => file + "?n=" + time;

function insertCss(file) {
	let css = document.createElement("link"); 
	css.rel = "stylesheet";
	css.href = file;

	document.head.appendChild(css);
}

function insertScript(file) {
	document.write("<script src='" + update(file) + "'></script>");
}

let scripts = ["scripts/class/Shell.js", "scripts/class/WorkList.js", "scripts/class/Work.js", "scripts/db.js", "scripts/commands.js"];

for (let i=0; i < scripts.length; i++)
	insertScript(scripts[i]);
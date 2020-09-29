let time = (new Date()).getTime();
let insert = file => document.write("<script src='" + file + "?n=" + time + "'></script>");

let scripts = [
			   "scripts/class/Shell.js",
			   "scripts/class/WorkList.js",
			   "scripts/class/Work.js",
			   "scripts/db.js",
			   "scripts/commands.js"
			  ];

for (let i=0; i < scripts.length; i++) insert(scripts[i]);
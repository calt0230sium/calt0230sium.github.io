class Shell {

	constructor(user, show_command, command_input, terminal, popupContent, asciiLogo, db){
		this.user = user;
		this.show_command = show_command;
		this.command_input = command_input;
		this.terminal = terminal;
		this.popupContent = popupContent;
		this.db = db;

		this.currentProject;
		this.currentWorkList;
		
		this.htmlEntities = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	clearCommandInput(){
		this.command_input.value = "";
	}

	createDiv(classDiv, idDiv, content){
		let div = document.createElement("div");

		div.setAttribute("class", classDiv);
		div.setAttribute("id", idDiv);
		div.innerHTML = content;

		return div;
	}

	createDivWithClass(classDiv) {
		return this.createDiv(classDiv, "", "");
	}

	login(str){
		let div = document.createElement("div");
		div.setAttribute("class", "commandBox");

		if(str != "") {
			this.user = this.htmlEntities(str);
			div.innerHTML = this.user + " > Your new username is : " + this.user;
		} else {
			div.innerHTML = this.user + " > You must enter a username to log in !";
		}

		this.terminal.appendChild(div);
	}

	displayDefault(){
		let div = document.createElement("div");
		div.setAttribute("class", "commandBox");
		div.innerHTML = this.user + " > No command assiociated with : \""+this.htmlEntities(this.command_input.value)+"\",<br>" +
						"type \"help\" in the entry to find a question to ask.";

		this.terminal.appendChild(div);
	}

	displayHelp(){
		let div = document.createElement("div");
		div.setAttribute("class", "commandBox");
		div.innerHTML = this.user + " > List of commands : <br>";

		//all commands
		let commands = document.createElement("div");
		commands.style.paddingLeft = "1%";

		for (let i=0; i < this.db.Command.length; i++)
			commands.innerHTML += this.db.Command[i][0] + " : " + this.db.Command[i][1] + "<br>";

		//specific work
		let workCommands = document.createElement("div");
		workCommands.style.paddingLeft = "1%";
		workCommands.innerHTML = "\"specific work\" commands : <br>"
		
		for(const WorkList in this.db.Work) workCommands.innerHTML += this.db.Work[WorkList].title + "? : Display " + this.db.Work[WorkList].title  + "(s)<br>";

		commands.appendChild(workCommands);
		div.appendChild(commands);

		this.terminal.appendChild(div);

	}

	displayWelcome(){
		let div = document.createElement("div");
		div.setAttribute("class", "commandBox");
		div.innerHTML = "> You can type help in the command input to discover more.";

		this.terminal.appendChild(div);
	}

	displayStart() {
		let header = document.createElement("header");
		let nav = document.createElement("nav");

		let title = document.createElement("pre");
		title.setAttribute("class", "asciiTitle");
		title.innerHTML = asciiLogo.innerHTML;

		for(let i=0; i<this.db.Social.length; i++) {
			let button = document.createElement("a");
			button.setAttribute("class", "navLink");
			button.setAttribute("target", "blank");
			button.setAttribute("tabindex", "-1");
			button.style.outline="none";
			button.innerHTML = this.db.Social[i][0];
			button.setAttribute("href", this.db.Social[i][1]);
			button.style.backgroundColor = this.db.Social[i][2];

			nav.appendChild(button);
		}

		header.appendChild(nav);
		header.appendChild(title);

		this.terminal.appendChild(header);
		this.displayAllWorks();
		this.displayAbout();
		this.displayWelcome();
	}

	displayAllWorks(){
		for(const WorkList in this.db.Work) this.displayWork(this.db.Work[WorkList]);
	}

	createWorkDiv(displayType) {
		let workDiv = document.createElement("div");

		switch(displayType){
			case 1: workDiv = this.createDivWithClass("workRow"); break; 
			case 2: workDiv = this.createDivWithClass("workColumn"); break;
			case 3: workDiv = this.createDivWithClass("workGrid"); break;
		}

		return workDiv;
	}

	createProjectDiv(displayType, currentProject) {
		let project = document.createElement("div");

		switch(displayType){

			case 1:
				project.setAttribute("class", "projectRow");
				project.style.backgroundImage  = "url(\"" + currentProject.background + "\")";
				project.addEventListener("click", e => {
					window.open(currentProject.background, '_blank');
				});
				break;
			
			case 2:
				project.setAttribute("class", "projectColumn");
				project.innerHTML = "<h1 class='titleProjectBig'>" + currentProject.title + "</h1>";
				project.style.backgroundImage  = "url(\"" + currentProject.background + "\")";
				project.addEventListener("click", e => {
					window.open(currentProject.link, '_blank');
				});
				break;
			
			case 3:
				project.setAttribute("class", "projectArticle");
				
				let projectPicture = this.createDivWithClass("projectPicture");
				projectPicture.style.backgroundImage = "url(\"" + currentProject.media + "\")";

				let projectDescription = this.createDivWithClass("projectDescription");
				projectDescription.innerHTML = "<h1 class='projectTitle'>" + currentProject.title + "</h1>";
				projectDescription.innerHTML += "<p>" + currentProject.description + "</p>";

				let projectLink = this.createDivWithClass("projectLinks");

				for (let i = 0; i < currentProject.links.length; i++) {
					let link = currentProject.links[i]
					let linkDiv = document.createElement("a");
					linkDiv.setAttribute("href", link[1]);
					linkDiv.setAttribute("target", "_blank");
					linkDiv.innerHTML = link[0];
					projectLink.appendChild(linkDiv);
				}

				project.appendChild(projectPicture);
				projectDescription.appendChild(projectLink);
				project.appendChild(projectDescription);
				break;
		}

		return project;
	}

	displayWork(WorkList){
		//container
		let work = this.createWorkDiv(WorkList.displayType);

		//title
		let title = document.createElement("h3");
		title.innerHTML = WorkList.title;
		title.setAttribute("class", "workTitle");
		work.appendChild(title); 

		let content;
		let WorkProject;

		for(let i = 0; i < WorkList.list.length; i++) {
			WorkProject = WorkList.list[i];

			content = this.createProjectDiv(WorkList.displayType, WorkProject);
			// links
			content.addEventListener("click", e => {
				this.currentProject = i;
				this.currentWorkList = WorkList.list;

			});
			work.appendChild(content);
		}

		this.terminal.appendChild(work);
	}

	displayAbout(){
		let commandBox = document.createElement("div");
		commandBox.setAttribute("class", "infoBox");
		commandBox.style.padding = "2%";

		let title = document.createElement("h1");
		title.setAttribute("class", "commandBoxTitle");
		title.innerHTML = this.db.About[0];

		let content = document.createElement("p");
		content.innerHTML = this.db.About[1];

		commandBox.appendChild(title);
		commandBox.appendChild(content);
		this.terminal.appendChild(commandBox);
	}

	displaySkill(){
		let commandBox = document.createElement("div");
		commandBox.setAttribute("class", "infoBox");

		let container = document.createElement("div");
		container.setAttribute("class", "mosaicContainer");

		for(let i=0; i < this.db.Skill.length; i++) {
			let skill = document.createElement("div");
			skill.setAttribute("class", "mosaicDiv");

			let title = document.createElement("h1");
			title.setAttribute("class", "commandBoxTitle");
			title.innerHTML = this.db.Skill[i][0];

			let gaugeContain = document.createElement("div");
			gaugeContain.style.width = this.db.Skill[i][1]+"%";

			let gauge = document.createElement("div");
			gauge.setAttribute("class", "gauge");
			gauge.innerHTML = this.db.Skill[i][1]+"%";

			gaugeContain.appendChild(gauge);
			skill.appendChild(title);
			skill.appendChild(gaugeContain);
			container.appendChild(skill);
		}

		commandBox.appendChild(container);

		this.terminal.appendChild(commandBox);
	}

	hideShow(div){
	    if (div.style.display === 'none')
	    	div.style.display = 'block';
	    else {
	    	this.popupContent.innerHTML = '';
	    	div.style.display = 'none';
	    }
	}

	clearConsole(){
		this.show_command.innerHTML = "";
	}
}
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

	login(str){
		let div = document.createElement("div");
		div.setAttribute("class", "commandBox");

		if(str != "") {
			this.user = this.htmlEntities(str);
			div.innerHTML = this.user + " > Your new username is : " + this.user;
			if (this.user === "Silk" || this.user === "silk")
				div.innerHTML += "<br> Oh, Hello me !";
		} else
			div.innerHTML = this.user + " > You must enter a username to log in !";

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
		
		for(const WorkList in this.db.Work) workCommands.innerHTML += this.db.Work[WorkList].title + "? : Display my " + this.db.Work[WorkList].title  + "(s)<br>";

		commands.appendChild(workCommands);
		div.appendChild(commands);

		this.terminal.appendChild(div);

	}

	displayWelcome(){
		let div = document.createElement("div");
		div.setAttribute("class", "commandBox");
		div.innerHTML = "Silk > Hello and welcome on my Website ! <br>"+
						"You can type help in the command input to discover more.";

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
		this.displayWelcome();
	}

	displayAllWorks(){
		let container = document.createElement("div");
		container.setAttribute("class", "container");
		container.innerHTML = "<h1 class='omegaTitle'>my work</h1>";
		this.terminal.appendChild(container);

		for(const WorkList in this.db.Work) this.displayWork(this.db.Work[WorkList]);
	}

	displayWork(WorkList){
		//container
		let work = document.createElement("div");

		switch(WorkList.displayType){
			//row
			case 1:
				work.setAttribute("class", "work");
			break;
			//column 
			case 2:
				work.setAttribute("class", "work2");
			break;
			//column
			case 3:
				work.setAttribute("class", "work2");
			break;
		}

		//title
		let title = document.createElement("h3");
		title.innerHTML = WorkList.title;
		title.setAttribute("class", "workTitle");

		work.appendChild(title); 

		let content;

		for(let i = 0; i < WorkList.list.length; i++) {
			let WorkProject = WorkList.list[i];

			content = document.createElement("div");
			work.appendChild(content);

			switch(WorkList.displayType){
				//row
				case 1:
					content.setAttribute("class", "project");
					content.style.backgroundImage  = "url(\"" + WorkProject.background + "\")";
				break;
				//column background
				case 2:
					content.setAttribute("class", "project2");
					content.innerHTML = "<h1 class='titleProjectBig'>" + WorkProject.title + "</h1>";
					content.style.backgroundImage  = "url(\"" + WorkProject.background + "\")";
				break;
				//column
				case 3:
					content.setAttribute("class", "project3");
					content.innerHTML = "<h1 class='titleProject'>" + WorkProject.title + "</h1>";
				break;
			}

			//popup
			content.addEventListener("click", e => {
				this.currentProject = i;
				this.currentWorkList = WorkList.list;

				this.createPopup();
				this.hideShow(popup);
			});
		}

		this.terminal.appendChild(work);
	}

	createPopup(){
		let WorkProject = this.currentWorkList[this.currentProject];

		this.popupContent.scrollTop = 0;
		body.style.overflow = "hidden";

		let media = this.createDivClass("media", WorkProject.media);

		let popupDescription = document.createElement("div");
		popupDescription.setAttribute("class", "popupDescription");

			let content = document.createElement("div");
			content.setAttribute("class", "content");

				let titlePopup = this.createDivId("titlePopup", WorkProject.title);
				let link = document.createElement("a");
				link.setAttribute("href", WorkProject.link);
				link.setAttribute("target", "blank");
				let userCurrent = "";
				if(this.user != "user") userCurrent = this.user;
				link.innerHTML = "<div class='buttonNav'> take a look " + userCurrent + " ! </div>";
				let text = this.createDivId("content", WorkProject.content);
				let date = this.createDivId("date", WorkProject.date);

			let popupNav = document.createElement("div");
				popupNav.setAttribute("class", "popupNav");

				let previous = this.createDivClass("buttonNav", "previous");
				let next = this.createDivClass("buttonNav", "next");
				let quit = this.createDivClass("buttonNav", "quit");

				previous.addEventListener('click', e => {
					this.popupContent.innerHTML = "";
					if(this.currentProject > 0) this.currentProject--;
					this.createPopup();
				});

				next.addEventListener('click', e => {
					this.popupContent.innerHTML = "";
					if(this.currentProject < this.currentWorkList.length - 1) this.currentProject++;
					this.createPopup();
				});

				quit.addEventListener('click', e => {
					this.popupContent.scrollTop = 0;
					this.popupContent.innerHTML = "";
					body.style.overflow = "auto";
					this.hideShow(popup);
				});

		if(WorkProject.media != "") this.popupContent.appendChild(media);

		if(WorkProject.title != "") content.appendChild(titlePopup);
		if(WorkProject.content != "") content.appendChild(text);
		if(WorkProject.link != "") content.appendChild(link);
		if(WorkProject.date != "") content.appendChild(date);

		if(this.currentProject < this.currentWorkList.length - 1) popupNav.appendChild(next);
		if(this.currentProject > 0) popupNav.appendChild(previous);

		popupNav.appendChild(quit);

		popupDescription.appendChild(content);
		popupDescription.appendChild(popupNav);

		this.popupContent.appendChild(popupDescription);
	}

	createDivId(idDiv, content){
		let div = document.createElement("div");
		div.setAttribute("id", idDiv);
		div.innerHTML = content;

		return div;
	}

	createDivClass(classDiv, content) {
		let div = document.createElement("div");
		div.setAttribute("class", classDiv);
		div.innerHTML = content;

		return div;
	}

	hideShow(div){
	    if (div.style.display === 'none')
	    	div.style.display = 'block';
	    else {
	    	this.popupContent.innerHTML = '';
	    	div.style.display = 'none';
	    }
	}

	displayAbout(){
		let commandBox = document.createElement("div");
		commandBox.setAttribute("class", "commandBox");
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
		commandBox.setAttribute("class", "commandBox");

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

	clearConsole(){
		this.show_command.innerHTML = "";
	}
}
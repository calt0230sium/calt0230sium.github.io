//launch
let commanndUse = false,
	//DOM object
	terminal = document.getElementById("terminal"),
	command_input = document.getElementById("input"),
	next = document.getElementById("next"),
	last = document.getElementById("last"),
	cross = document.getElementById("cross"),
	popup = document.getElementById("popup"),
	popupContent = document.getElementById("popupContent"),
	asciiLogo = document.getElementById("title"),
	//object
	SilkConsole = new Shell ("user", terminal, command_input, terminal, popupContent, asciiLogo, Database);

window.onload = function() {
	console.log(asciiLogo.innerHTML);

	SilkConsole.displayStart();
}

command_input.addEventListener('keypress', function(event){
	if(event.keyCode == 13 && command_input.value != ""){

		commanndUse = false;

		for(const WorkList in Database.Work){
			if(command_input.value === Database.Work[WorkList].title+"?"){
				commanndUse = true;
				SilkConsole.displayWork(Database.Work[WorkList]);
			}
		}

		if (command_input.value.slice(0, 5) === Database.Command[4][0].slice(0, 5)) {
			commanndUse = true;
			SilkConsole.login(command_input.value.slice(6));
		}

		if(!commanndUse){
			switch(command_input.value) {

				case "help":
					SilkConsole.displayHelp();
				break;

				case Database.Command[0][0]:
					SilkConsole.displayStart();
				break;

				case Database.Command[1][0]:
					SilkConsole.displayAllWorks();
				break;

				case Database.Command[2][0]:
					SilkConsole.displayAbout();
				break;

				case Database.Command[3][0]:
					SilkConsole.displaySkill();
				break;

				case Database.Command[5][0]:
					SilkConsole.clearConsole();
				break;

				default:
					SilkConsole.displayDefault();
				break;
			}
		}

		SilkConsole.clearCommandInput();

		window.scrollTo(0,document.body.scrollHeight);
	}
});
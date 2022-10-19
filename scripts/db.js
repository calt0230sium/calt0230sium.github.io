let Database = {

	Command : [
		["start", "Display my social media and my portfolio."],
		["work?", "Display my portfolio."],
		["about?", "Some informations about me."],
		["skill?", "Show some of my competencies."],
		["login + your username", "enter your username to customize your experience"],
		["clr", "Clear the console."]
	],

	Social : [
		["itch.io", "https://caesiumm.itch.io/", "#F26C6C"],
		["github", "https://github.com/calt0230sium", "#6C71F2"],
	],

	Work : {
		Works : new WorkList ("my work", 3, [
			new Project (
				"./assets/pictures/p1.png",
				"Collide.js",
				"Minimal javaScript game engine. It manages collisions, gravity and inertia.",
				[ 
					["github", "https://github.com/Silk-machines/Collide.js"], 
				],
			),

			new Project (
				"./assets/pictures/g0.png",
				"NonSense",
				"NonSense is a 2d plateformer which take place in strange ruin : the laws of gravity changes depending on where you are.",
				[ 
					["test it", "https://caesiumm.itch.io/nonsense"], 
				],
			),

			new Project (
				"./assets/pictures/p3.png",
				"Pathfinding",
				"The Flow Field pathfinding implemented in Unity.",
				[ 
					["github", "https://github.com/calt0230sium/Pathfinding"],
				],
			),

			new Project (
				"./assets/pictures/p4.png",
				"Cellular Automaton",
				"1D (elementary cellular automaton) and 2D (game of life and other rules) cellular automatons implemented in Haskell.",
				[ 
					["github", "https://github.com/calt0230sium/CellularAutomaton"],
				],	
			),
		]),

		Games : new WorkList ("games", 2, [
				new Game (
					"NonSense",
					"./assets/pictures/g0.png",
					"./assets/pictures/g1.png",
					"NonSense is a 2d plateformer which take place in strange ruins : the laws of gravity changes depending on where you are. Everyone in this place seem to be an explorer in quest of a powerful and mysterious treasure...",
					"https://si1k.itch.io/nonsense",
					"01/08/2019"
				)
			]),

		Illustrations : new WorkList("illustrations", 1, [

				new Illustration(
					"./assets/pictures/i3.png",
					"27/06/2020"
				),

				new Illustration(
					"./assets/pictures/i2.png",
					"07/08/2019"
				),

				new Illustration(
					"./assets/pictures/i1.png",
					"05/12/2019"
				),

				new Illustration(
					"./assets/pictures/i0.png",
					"15/07/2018"
				)
			]),
	},

	About : ["About :", "Hello and welcome on my Website ! <br> I'm a computer scientist student interested in the field of computer graphic. I'm also an amateur game developer and artist."],
	
	Skill : [
		["2D physics", 20],
		["3D rendering", 30],
		["Python", 60],
		["Java", 60],
		["Scala", 40],
		["C++", 30],
		["JavaScript", 50],
		["Photoshop", 40],
	],
};

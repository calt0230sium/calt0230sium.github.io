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
		["itch.io", "https://si1k.itch.io/", "#F26C6C"],
		["twitter", "https://twitter.com/Silk_rgb", "#6C71F2"],
		["github", "https://github.com/Silk-machines", "#FED85A"],
		["youtube", "https://www.youtube.com/channel/UCCm5D4vmr7RqnJYf0joL1fw/featured", "#ED7FAF"]
	],

	Work : {
		Games : new WorkList ("games", 2, [
				new Game (
					"NonSense",
					"http://escape.ellium.free.fr/medias/g0.png",
					"http://escape.ellium.free.fr/medias/g0.gif",
					"NonSense is a 2d plateformer which take place in strange ruins : the laws of gravity changes depending on where you are. Everyone in this place seem to be an explorer in quest of a powerful and mysterious treasure...",
					"https://si1k.itch.io/nonsense",
					"01/08/2019"
				)
			]),

		Illustrations : new WorkList("illustrations", 1, [

				new Illustration(
					"http://escape.ellium.free.fr/medias/i3.png",
					"27/06/2020"
				),

				new Illustration(
					"http://escape.ellium.free.fr/medias/i2.png",
					"07/08/2019"
				),

				new Illustration(
					"http://escape.ellium.free.fr/medias/i1.png",
					"05/12/2019"
				),

				new Illustration(
					"http://escape.ellium.free.fr/medias/i0.png",
					"15/07/2018"
				)
			]),

		Programs : new WorkList("programs", 3, [
				new Program(
					"Collide.js",
					"Minimal javaScript game engine made with the canvas 2d technology.",
					"https://github.com/Silk-machines/Collide.js",
					"02/06/2020"
				)
			]),

		music : new WorkList("musics", 3, [
				new Music(
					"Cheaptune",
					"https://www.youtube.com/embed/HnLUhWBHGDc",
					"24/07/2019"
				),

				new Music(
					"TreasureSeekers",
					"https://www.youtube.com/embed/ggo6Ztld-4c",
					"24/07/2019"
				),

				new Music(
					"LastStretch",
					"https://www.youtube.com/embed/4qBqNhc1y0E",
					"24/07/2019"
				)
			])
	},

	About : ["About :", "I'm a computer scientist student, and amateur game devlopper."],

	Skill : [
		["Java", 40],
		["Scala", 35],
		["HTML/CSS", 60],
		["javaScript", 50],
		["PHP", 30],
		["Photoshop", 40]
	],
};

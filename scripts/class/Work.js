class Work {
	constructor(title = "", 
				background = "", 
				media = "", 
				content = "", 
				link = "", 
				date = ""){
		
		//worklist
		this.title = title;
		this.background = background;

		//popup
		this.media = media;
		this.content = content;
		this.link = link;
		this.date = date;
	}
}

class Game extends Work {
	constructor(title, background, media, content, link, date) {
		super(title, background, "<img src='" + media + "' id='media'/>", content, link, date);
	}
}

class Illustration extends Work {
	constructor(media, date) {
		super("", media, "<img src='" + media + "' id='media'/>", "", media, date);
	}
}

class Program extends Work {
	constructor(title, content, link, date) {
		super(title, "", "", content, link, date);
	}
}

class Music extends Work {
	constructor(title, media, date) {
		super(title, "", '<iframe src="'+media+'" frameborder="0", allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen id="media"  width="800px" height="500px"></iframe>', "", media, date);
	}
}
const giphyApi = "https://api.giphy.com/v1";
const gifsSlug = "/gifs";
const stickersSlug = "/stickers";
const searchEP = "/search";
const trendingEP = "/trending";

// api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym
const api_key = "FZMZ2RjP1gWJ2lQUD55jvrZxkV7nln35";

console.log("Let's get this party started!");

// * Your application should do the following:
// Allow the user to search for a GIF and when the form is submitted, make an AJAX request to the Giphy API and return a single GIF
// Once the Giphy API has responded with data, append the GIF to the page
// Allow the user to search for as many GIFs as they would like and keep appending them to the page
// Allow the user to remove all of the GIFs by clicking a button

const searchForGifs = async (search) => {
	let randomIndex = Math.floor(Math.random() * 50);
	const res = await axios.get(giphyApi + gifsSlug + searchEP, {
		params: {
			q: search,
			api_key,
		},
	});
	const { data } = res.data;
	makeGif(data[randomIndex].images.original.url, data[randomIndex].title);
};

const makeGif = (gifUrl, gifUrlAlt) => {
	// * jQuery way
	let results = $("#gif-results");
	let newGif = $("<div>").addClass("col-sm-6 col-md-4 mb-5 d-block");
	let newGifImg = $("<img>")
		.addClass("gif-result-img w-100")
		.attr("src", gifUrl)
		.attr("alt", gifUrlAlt);
	newGif.append(newGifImg);
	results.append(newGif);
};

const form = document.querySelector("#giphy-form");
const input = document.querySelector("#search-term");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	// assign input vaue to the breed image search function
	searchForGifs(input.value);
	// reset input value to empty
	input.value = "";
});

form.addEventListener("reset", (e) => {
	e.preventDefault();
	$("#gif-results").empty();
});

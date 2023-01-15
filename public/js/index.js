const app = document.getElementById('app'),
	html = `<h2>this is js</h2>`;

function addcontent(content){
	app.innerHTML += content;
}
addcontent(html);
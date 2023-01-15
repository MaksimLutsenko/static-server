const fs = require('fs')
const http = require('http');
const url = require('url')

const hostname ='127.0.0.1',
	port = 3000;

const pages = {
		home: './public/index.html'
	},
	contenttypes = {
		default: 'Content-Type'
	},
	mimetypes = {
		html: "text/html",
		css: "text/css",
		js: "text/javascript"
	};

function s(filePath, response){
	fs.access(filePath, fs.constants.R_OK, (err) => {
		if(err){
			return response.statusCode = 404 && response.end("Resourse not found!");
		}
	  });
	  return fs.createReadStream(filePath, 'utf-8');
}

const app = http.createServer((req,res)=>{
	const parseUrl = url.parse(req.url, true);
	if(parseUrl.pathname == '/'){
		res.statusCode = 200;
		res.setHeader(contenttypes.default, mimetypes.html)
		s(pages.home, res).pipe(res)
	}
	else{
		if(parseUrl.pathname !== '/favicon.ico'){
			const excode = parseUrl.pathname.split(".");
			res.statusCode = 200;
			res.setHeader(contenttypes.default, mimetypes[excode[1]])
			s('./public'+ parseUrl.pathname, res).pipe(res)
		}
		else res.end(null)
	}
	
});
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
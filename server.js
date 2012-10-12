var express = require("express");
var app = express();    

var http=require('http'), simplexml=require('xml-simple'), config= {host:'enr.construction.com', path:'/news/rss/enr.xml', port:80}, body='';

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express['static'](__dirname));
  app.use(express.errorHandler({
    showStack: true,
    dumpExceptions: true
  }));
  app.set('view engine', 'ejs');
});

// //setup the errors
// app.error(function(err, req, res, next){
//     if (err instanceof NotFound) {
// 		res.sendfile('404.html');
//     } else {
// 		res.sendfile(__dirname + '/500.html');
//     }
// });


app.get('/', function(req, res){

  http.get( config, function( fetch ) {
    fetch.addListener('end', function() {
      simplexml.parse(body, function(e, parsed) {

        // res.sendfile(__dirname + '/index.htm');
        res.render('index', { items: parsed.channel.item })
      
      });
    });
    fetch.setEncoding('utf8');
    fetch.on('data', function(d) {
      body+=d;
    });
  });



    
});


// app.get('/help', function(req, res){
//     res.sendfile('help.html');
// });

// app.get('/about', function(req, res){
//     res.sendfile(__dirname + '/about.html');
// });



app.listen(process.env.PORT || 3000);
console.log('starting server on port 3000');


// //The 404 Route (ALWAYS Keep this as the last route)
// app.get('/*', function(req, res){
//     throw new NotFound;
// });

// function NotFound(msg){
//     this.name = 'NotFound';
//     Error.call(this, msg);
//     Error.captureStackTrace(this, arguments.callee);
// }
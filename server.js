var express = require("express");
var app = express();    

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express['static'](__dirname));
  app.use(express.errorHandler({
    showStack: true,
    dumpExceptions: true
  }));
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
    res.sendfile(__dirname + '/index.htm');
});


app.get('/help', function(req, res){
    res.sendfile('help.html');
});

app.get('/about', function(req, res){
    res.sendfile(__dirname + '/about.html');
});



app.listen(3000);
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
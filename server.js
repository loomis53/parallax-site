var express = require("express");
var app = express();    

var databaseUrl = "mongodb://bsiio:bsiio@alex.mongohq.com:10069/bsiio"; //Example using MongoHQ: [USER]:[PASSWORD]@staff.mongohq.com:[PORT]/[APP]
var collections = ['links'];
var db = require("mongojs").connect(databaseUrl,collections);

var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// var http=require('http'), simplexml=require('xml-simple'), config= {host:'enr.construction.com', path:'/news/rss/enr.xml', port:80}, body='';
var http=require('http'), simplexml=require('xml-simple'), config= {host:'feeds.feedburner.com', path:'/bsi/gVfl', port:80}, body='';
// var http=require('http'), simplexml=require('xml-simple'), config= {host:'blog.bsi.io', path:'/rss', port:80}, body='';

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

  var items = [];
  var body = "";

  http.get(config, function(fetch) {
    // console.log("Got response: " + fetch.statusCode);


    fetch.on("data", function(chunk) {
      body+=chunk;
    });
    fetch.on("end", function() {
      simplexml.parse(body, function(e, parsed) {
        if(e){
          console.log("error");
        } else {
          items.push(parsed.channel.item)
        }

      });
        res.render('index', { items: items });

    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    res.render('index', { items: [] });
  });

    
});

app.get('/link', function(req, res){
  res.render('link');
});

app.get('/apps/iforms', function(req, res){
  res.render(__dirname + 'apps/demo/index.html');
});

app.get('/shorten', function(req, res){

  var url = req.query.q;

  // If the URL doesn't start with http, add it.
  if (url.search(/^http/) == -1) {
      url = 'http://' + url;
  }

  var shortcode = makeid(url);


  db.links.save({shortcode: shortcode, url: url}, function(err, saved) {

    if( err || !saved ) {
      console.log("Link not saved");
      res.send('Link Not Saved :(');
    } else {
      console.log("Link saved");
      res.send('http://bsi.io/' + shortcode + ' <a href="http://bsi.io/' + shortcode + '" target="_new">(open)</a>');
    }

  });  

});

app.get('/:link', function(req, res){


  db.links.find({shortcode: req.params.link}, function(err, links) {
    
    if( err || !links.length) {
      res.render('link');
    } else {
      res.redirect(links[0].url);
    }

  });  

});


app.listen(process.env.PORT || 3000);
console.log('starting server on port 3000');

// Link shortener logic
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


// //The 404 Route (ALWAYS Keep this as the last route)
// app.get('/*', function(req, res){
//     throw new NotFound;
// });

// function NotFound(msg){
//     this.name = 'NotFound';
//     Error.call(this, msg);
//     Error.captureStackTrace(this, arguments.callee);
// }
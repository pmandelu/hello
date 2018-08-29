var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(cookieParser());
app.use(session({secret: "secret",resave: true,saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/static',express.static('static'));

app.set('view engine', 'pug')
app.set('views', './views');

app.get('/', function(req, res){
   if (!req.session.count) req.session.count = 0;
   req.session.count++;
   res.render("counter", {count:req.session.count});
});

app.get('/math', (req, res) => {
  res.render('form');
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/game.html'));
});

app.post('/', function(req, res){
   var a,b,str,res;
   var ok = true;
   if (req.body.button1) {
	   a = req.body.num1;
	   b = req.body.num2;
	   str = '+';
	   c = parseInt(a)+parseInt(b);
   }
   if (req.body.button2) {
	   a = req.body.num3;
	   b = req.body.num4;
	   str = '-';
	   c = parseInt(a)-parseInt(b);
   }
   if (req.body.button3) {
	   a = req.body.num5;
	   b = req.body.num6;
	   str = '*';
	   c = parseInt(a)*parseInt(b);
   }
   if (req.body.button4) {
	   a = req.body.num7;
	   b = req.body.num8;
	   str = '/';
	   c = parseInt(a)/parseInt(b);
   }
   if (isNaN(a) || isNaN(b) || isNaN(c)) {
	   res.render("error");
   } else {
	   res.render('result', {a:a,b:b,str:str,c:c});
   }
});

app.listen(3000);
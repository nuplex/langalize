
var mysql = require("mysql");
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

var con = mysql.createConnection({
  host:"localhost",
  user:"langadmin",
  password:"test",
  database: "langalize"
});

con.connect(function(error) {
  if(error){
    console.log('Error connecting to database');
    console.log(error);
    return;
  }

  console.log('Connection established.')
});
//Creates instance of http server w/ express module
var server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


function add(text){
  con.query('INSERT INTO words SET ?', text, function(err,result){
    if(err){
      return error;
    }
  });
}

function del(textIn){
  con.query('DELETE FROM words WHERE text = ?', textIn, function(err,result){
    if(err){
      return error;
    }
  })
}

function solve(textIn, answer){
  con.query('UPDATE words SET is_solved=1, answer = ? WHERE text= ?', [answer, textIn], function(err, result){
    if(err){
      return error;
    }
  });
}

function getUnsolved(callback){
  con.query('SELECT text FROM words WHERE is_solved=0', function(err, rows){
    if(err){
      throw err;
    } else {
      callback(rows);
    }

  });
}

function getSolved(callback){
  con.query('SELECT text, answer FROM words WHERE is_solved=1', function(err, rows){
    if(err){
      throw err;
    } else {
      callback(rows);
    }

  });
}

function end(){
  con.end(function(error){});
}

app.post('/api/add', function(request, response, next){
  //If json sent is { name : 'aljdfa' } you access it by doing request.body.name
  try{
    console.log("Adding word: "+request.body.word.text);
    add({text: request.body.word.text,
         answer: request.body.word.answer,
         is_solved: false});
    response.status(202).end();
  } catch(err){
    console.log(err.message);
    response.send(JSON.stringify({ error : err.message }));
  }
});

app.get('/api/get_solved', function(request, response){

  try {
    getSolved(function(data){
      response.send(JSON.stringify({ result: data }));
    });
  }
  catch(err) {
    console.log(err.message);
    response.send(JSON.stringify({ error : err.message }));
  }

});

app.get('/api/get_unsolved', function(request, response){

  try {
    getUnsolved(function(data){
      response.send(JSON.stringify({ result: data }));
    });
  }
  catch(err) {
    console.log(err.message);
    response.send(JSON.stringify({ error : err.message }));
  }

});

app.post('/api/solve', function(request, response, next){
  //If json sent is { name : 'aljdfa' } you access it by doing request.body.name
  try{
    console.log("Solving word: "+request.body.text+" with "+request.body.answer);
    solve(request.body.text, request.body.answer);
    response.status(202).end();
  } catch(err){
    console.log(err.message);
    response.send(JSON.stringify({ error : err.message }));
  }
});

app.post('/api/delete', function(request, response, next){
  //If json sent is { name : 'aljdfa' } you access it by doing request.body.name
  try{
    console.log("Deleting word: "+request.body.text);
    del(request.body.text);
    response.status(202).end();
  } catch(err){
    console.log(err.message);
    response.send(JSON.stringify({ error : err.message }));
  }
});


server.listen(12345, '0.0.0.0', 511, function() {});

console.log('App is listening to: http://localhost:12345');


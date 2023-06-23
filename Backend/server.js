require('dotenv').config()


var express = require('express')
var cors = require('cors')
var app = express()

var bodyParser = require('body-parser')
var jsonparsor = bodyParser.json()

app.use(cors());
// connect my maraidb
 const mysql = require('mysql2');
//create connect database
const connection = mysql.createConnection({
    host: 'localhost'
    , user: process.env.DB_USERNAME
    , password: process.env.DB_PASSWORD
    , database: 'react-api2'
    , port: '3309'
    });

//endpoint
app.get('/listuser', jsonparsor , function(req, res, next){

    //select sql
    connection.execute("SELECT * FROM user",
          function(err,result,fields){
            
                      if(err){
                        res.json({status:'error',massage:err})
                        return
                      }else{
                        res.json(result);
                      }
          });
  }); 
  //select sql

// end point //
app.post('/creates', jsonparsor , function(req, res, next){
  
  //insert sql
  connection.execute("INSERT INTO user (fname,lname,username,email,avatar) VALUE (?,?,?,?,?)",[req.body.fname, req.body.lname, req.body.username, req.body.email, req.body.avatar],
        function(err,result,fields){
          
                    if(err){
                      res.json({status:'error',massage:err})
                      return
                    }else{
                      res.json({status:'ok'})
                    }
        });
});
//insert sql

//listuser id
app.post('/updateuser/:id', jsonparsor, function (req, res, next) {
  const fetchid = req.params.id;
  connection.query(
    'SELECT * FROM user WHERE id = ?',[fetchid],
    
    function(err, results, fields) {
      if (err){
        console.log(err)

      }else{
        res.send(results)
      }
    }
  );
  
});
//listuser id

//update sql
app.post('/update', jsonparsor , function(req, res, next){
  //console.log('test')
  //res.json({msg:req.body})
  
  //insert sql
  connection.execute("UPDATE user SET fname = (?), lname = (?), username = (?), email = (?), avatar = (?) WHERE id = (?)",
  [req.body.fname, req.body.lname, req.body.username, req.body.email, req.body.avatar, req.body.id],
  function(err, result, fields) {
    if (err) {
      res.json({ status: 'error', message: err });
      return;
    }
    res.json({ status: "ok", user: result.id });
  }
);
});
//update sql

// end point //
app.delete('/delete', jsonparsor , function(req, res, next){
  
  //delete sql
  connection.execute("DELETE FROM user WHERE id = (?) ",[req.body.id],
        function(err,result,fields){
          
                    if(err){
                      res.json({status:'error',massage:err})
                      return
                    }else{
                      res.json({status:'ok'})
                    }
        });
});
//delete sql

// end point //
app.post('/createminio', jsonparsor , function(req, res, next){
  
  //insert sql
  connection.execute("INSERT INTO image (image) VALUE (?)",[req.body.image],
        function(err,result,fields){
          
                    if(err){
                      res.json({status:'error',massage:err})
                      return
                    }else{
                      res.json({status:'ok'})
                    }
        });
});
//insert sql



/* var Minio = require('minio')

// Instantiate the minio client with the endpoint
// and access keys as shown below.
var minioClient = new Minio.Client({
    endPoint: '192.168.10.19',
    port: 9000,
    useSSL: true,
    accessKey: 'backet-thitipun',
    secretKey: 'cAI5D3Yf8DO6DzD2xjj1sPyjrgBDIHBTM41bSCcK'
});

// File that needs to be uploaded.
var file = '/tmp/photos-europe.tar'

// Make a bucket called europetrip.
minioClient.makeBucket('europetrip', 'us-east-1', function(err) {
    if (err) return console.log(err)

    console.log('Bucket created successfully in "us-east-1".')

    var metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        'example': 5678
    }
    // Using fPutObject API upload your file to the bucket europetrip.
    minioClient.fPutObject('europetrip', 'photos-europe.tar', file, metaData, function(err, etag) {
      if (err) return console.log(err)
      console.log('File uploaded successfully.')
    });
});
 */

//set port 
  app.listen(3333, function () {
    console.log('CORS-enabled web server listening It work now port 3333') 
  });
//set port 

var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var app = express();
const fileUpload = require('express-fileupload');
var formidable = require('formidable');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');

var Cart = require('./js-files/cart');
app.set('view engine', 'ejs')


var re = {};
app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/mymusicapp', express.static(__dirname + '/mymusicapp'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));
//app.use('/', express.static(__dirname + ''));

var port = 1337;

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
// app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
var sess;

// Home page for the music app.
app.get('/', function (req, res) {

  ytdl('https://www.youtube.com/watch?v=QzKIMMq2inI&list=PL0VRw7kMBE_eTASUl02Z0CLA9OofOXW5J&ab_channel=BajaoMusic', {
    quality: 'highestaudio',
  }).pipe(fs.createWriteStream('nusrat.mp4'));

  res.render('winter', {
    title: 'Song List',
    data: [
      { src: 'nusrat.mp4', songname: 'Vigad gayi' },
      { src: 'nusrat.mp4', songname: 'Vigad gayi' },
      { src: 'nusrat.mp4', songname: 'Vigad gayi' }
    ]
  })

});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

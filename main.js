if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');

var app = express();

const fileUpload = require('express-fileupload');
var formidable = require('formidable');
const bodyParser = require('body-parser');

const ytdl = require('ytdl-core');
const yts = require('yt-search')

var Cart = require('./js-files/cart');

app.set('view engine', 'ejs')
app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/mymusicapp', express.static(__dirname + '/mymusicapp'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));
//app.use('/', express.static(__dirname + ''));

var port = process.env.port || '1337';
app.set('port', port); // set express to use this port

// app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
// app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
var sess;

// Home page for the music app.
app.get('/', async function (req, res) {

  // console.log(await ytdl.getBasicInfo('https://www.youtube.com/watch?v=k09uvR5eUao&ab_channel=ErosNowMusic', []));
  // ytdl('https://www.youtube.com/watch?v=k09uvR5eUao&ab_channel=ErosNowMusic').pipe(fs.createWriteStream('video.mp4'));

  var dataArr = [];

  const r = await yts('vigad gayi')

  const videos = r.videos.slice(0, 3)
  videos.forEach(function (v) {
    const views = String(v.views).padStart(10, ' ')
    console.log(`${views} | ${v.title} (${v.timestamp}) | ${v.author.name}`)
    // console.log(v)

    dataArr.push({ src: v.url, songname: v.title, id: v.videoId })
  })

  res.render('winter', {
    title: 'Song List',
    data: dataArr
  })

});


app.post('/searchSongs', async function (req, res) {

  var dataArr = [];
  const r = await yts(req.body.search2)

  const videos = r.videos.slice(0, 4)
  videos.forEach(function (v) {

    const views = String(v.views).padStart(10, ' ')
    console.log(`${views} | ${v.title} (${v.timestamp}) | ${v.author.url}`)

    dataArr.push({ src: v.url, songname: v.title, id: v.videoId })

  })

  res.render('winter', {
    title: 'Song List',
    data: dataArr
  })

});

app.get('/play/:id', async (req, res) => {

  // console.log(req.params.id + ' this is the id of the song.')
  const path = 'mymusicapp/songs/' + req.params.id + '.mp3';

  try {
    fs.accessSync(path);
    console.log('file exists');
    // return;
  } catch (err) {
    ytdl('http://www.youtube.com/watch?v=' + req.params.id, { quality: 'highestaudio' }).pipe(fs.createWriteStream('mymusicapp/songs/' + req.params.id + '.mp3'));

    
    console.log('file not found');
    // console.error(err);
  }
  res.json({ message: req.params.id })
});

app.get('/mymusicapp/songs/:id', async (req, res) => {

  
  console.log(req.params.id + ' this is the id of the song.')
 // const path = 'mymusicapp/songs/' + req.params.id + '.mp3';
//  const test = 'test.mp3'
const path = req.params.id;

var filestream = fs.createReadStream(path);
var range = request.headers.range.replace("bytes=", "").split('-');

filestream.on('open', function() {
  var stats = fs.statSync(path);
  var fileSizeInBytes = stats["size"];

  // If the start or end of the range is empty, replace with 0 or filesize respectively
  var bytes_start = range[0] ? parseInt(range[0], 10) : 0;
  var bytes_end = range[1] ? parseInt(range[1], 10) : fileSizeInBytes;

  var chunk_size = bytes_end - bytes_start;

  if (chunk_size == fileSizeInBytes) {
    // Serve the whole file as before
    response.writeHead(200, {
      "Accept-Ranges": "bytes",
      'Content-Type': 'audio/mpeg',
      'Content-Length': fileSizeInBytes});
    filestream.pipe(response);
  } else {
    // HTTP/1.1 206 is the partial content response code
    response.writeHead(206, {
      "Content-Range": "bytes " + bytes_start + "-" + bytes_end + "/" + fileSizeInBytes,
      "Accept-Ranges": "bytes",
      'Content-Type': 'audio/mpeg',
      'Content-Length': fileSizeInBytes
    });
    filestream.pipe(response.slice(bytes_start, bytes_end));
  }
});

// const songId = req.params.id.substring(0, req.params.id.indexOf('.mp3'));
//  console.log(req.params.id.substring(0, req.params.id.indexOf('.mp3')))

  // try {
  //   fs.accessSync(path);
  //   console.log('file exists');
  //   // return;
  // } catch (err) {
  //   ytdl('http://www.youtube.com/watch?v=' + songId, { quality: 'highestaudio' }).pipe(fs.createWriteStream('mymusicapp/songs/' + songId + '.mp3'));

    
  // //   console.log('file not found');
  //   // console.error(err);
  // }
  // res.json({ message: req.params.id })
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

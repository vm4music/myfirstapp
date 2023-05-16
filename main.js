if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var fs = require('fs');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

const ytdl = require('ytdl-core');
const yts = require('yt-search');
const extension = '.mp3';

app.set('view engine', 'ejs')
app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/mymusicapp', express.static(__dirname + '/mymusicapp'));
app.use('/mymusicapp/songs', express.static(__dirname + '/mymusicapp/songs'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));

var port = process.env.port || '1337';
app.set('port', port); // set express to use this port

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
// app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// Home page for the music app.
app.get('/', async function (req, res) {

  // console.log(await ytdl.getBasicInfo('https://www.youtube.com/watch?v=k09uvR5eUao&ab_channel=ErosNowMusic', []));
  // ytdl('https://www.youtube.com/watch?v=k09uvR5eUao&ab_channel=ErosNowMusic').pipe(fs.createWriteStream('video.mp4'));
  // console.log(`${views} | ${v.title} (${v.timestamp}) | ${v.author.name}`)

  var dataArr = [];

  const r = await yts('vigad gayi')
  const videos = r.videos.slice(0, 3)

  videos.forEach( (v) => {

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

    dataArr.push({ src: v.url, songname: v.title, id: v.videoId })

  })

  res.render('musicAPI', {
    title: 'Song List',
    data: dataArr
  })

});

app.get('/play/:id', async (req, res) => {

  const path = 'mymusicapp/songs/' + req.params.id + extension;

  try {
    fs.accessSync(path);
    console.log('file exists at : ' + path);

  } catch (err) {
    ytdl('http://www.youtube.com/watch?v=' + req.params.id + extension, { quality: 'highestaudio' }).pipe(fs.createWriteStream('mymusicapp/songs/' + req.params.id + extension));

    console.log('file not found');
  }

  res.json({ message: req.params.id })
});

app.get('/playNew/:id', async (req, res) => {
  const rstream = fs.createReadStream('mymusicapp/songs/' + req.params.id + extension);
  rstream.pipe(res);
})

app.get('/playNew', async (req, res) => {

  res.render('safari', {
    title: 'Song List'
    })
})

app.get('/mymusicapp/songs/:id', (req, res) => {

  const path = '/mymusicapp/songs/' + req.params.id;
  res.json({ message: req.params.id })

});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

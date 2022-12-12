// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

var http = require('http');
var url = require('url');
var fs = require('fs');
// var mysql = require('mysql');
var express = require('express');
var app = express();
//var multer = require('multer');
//var upload = multer();
const fileUpload = require('express-fileupload');
var formidable = require('formidable');
const bodyParser = require('body-parser');

var Cart = require('./js-files/cart');
// var passport = require('passport');
// const session = require('express-session');
// const flash = require('express-flash');
app.set('view engine', 'ejs')
// const bcrypt = require('bcrypt');
// var MySQLStore = require('express-mysql-session')(session);
// require('./js-files/passport-config')(passport);
// initializePassport(passport);

var expressValidator = require('express-validator')
app.use(expressValidator());

//var urlencodedParser = bodyParser.urlencoded({ extended: false })
var re = {};
//var type = upload.single('image');
//app.use(upload.array()); 
app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/mymusicapp', express.static(__dirname + '/mymusicapp'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));
//app.use('/', express.static(__dirname + ''));

// var con = mysql.createPool({
// connectionLimit : 100,
//   host: "localhost",
//   user: process.env.MYSQL_USER || "root",
//   password: process.env.MYSQL_PASSWORD || "Fuckyou@123!",
//   clearExpired: true,
//   checkExpirationInterval: 9000,
//   expiration: 8640,
//   database: process.env.MYSQL_DATABASE || "myshop"
// });
// var sessionStore = new MySQLStore({}, con);
// app.use(session({
//   secret: 'somesecret',
//   store: sessionStore,
//   resave: false,
//   saveUninitialized: true
// }))

// app.use(passport.initialize())
// app.use(passport.session())
// app.use(flash())



var port = 1337;

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
// app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
// const methodOverride = require('method-override')
var sess;

app.use(function (req, res, next) {
  res.locals.session = req.session;  // 
  next();
});


// //Route to add the new songs.
// app.get('/add', function(req, res, next){    
//     // render to views/user/add.ejs
//     res.render('add', {
//         title: '',
//         author: '',
//         src: ''
//     })
// });


// app.get('/home', function(req, res, next){    
//     // render to views/user/add.ejs
//     res.render('home', {
//         title: '',
//         author: '',
//         src: ''
//     })
// });


app.get('/details', function (req, res, next) {
  // render to views/user/add.ejs
  res.render('detail2', {
    title: '',
    author: '',
    src: ''
  })
});


// app.post('/add', function(req, res, next){    
//     var errors = req.validationErrors()

//     if( !errors ) {   //No errors were found.  Passed Validation!

//         var song = {};

// 		var form = new formidable.IncomingForm();
//         form.parse(req, function (err, fields, files) {

// 	    song = {
// 	            title: fields.title,
//                 author: fields.author,
//                 src: files.filetoupload.name
// 		    }
//         console.log(JSON.stringify(song) + "VVVVVVVVVVVVVVVVVVVV");	
//         var oldpath = files.filetoupload.path;
//         var newpath = '/home/vikky/myfirstapp/mymusicapp/' + files.filetoupload.name;
//      	//var newpath = '/home/ubuntu/myfirstapp/mymusicapp/' + files.filetoupload.name;
// 	 //var newpath = 'C:/Users/Vikas/mymusicapp/' + files.filetoupload.name;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         //
//       });

// 	  con.getConnection(function(error, conn) {
//             con.query('INSERT INTO songs SET ?', song, function(err, result) {
//                 if (err) {
//                     console.log(err);
//                     res.render('add', {
//                         title: song.title,
// 			            author: song.author,
// 			            src: song.src
//                     })
//                 } else {                
//                     res.render('add', {
//                         title: '',
// 			            author: '',
// 			            src: ''                    
//                     })
//                 }
//             })
//         })
//  });
//     }
//     else {   //Display errors to user
//         var error_msg = ''
//         errors.forEach(function(error) {
//             error_msg += error.msg + '<br>'
//         })                
//         req.flash('error', error_msg)        

//         res.render('add', { 
//             title: req.body.title,
//             author: req.body.author,
//             src: req.body.src
//         })
//     }
// });


// app.post('/doLogin', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   }))
// app.post('/doLogin', function(req, res, next){    
//     var errors = req.validationErrors()
//     console.log(errors);
//     if( !errors ) {   //No errors were found.  Passed Validation!

//         var user = {};

// 		var form = new formidable.IncomingForm();
//         form.parse(req, function (err, fields, files) {
//     console.log(fields.username);
// 	    user = {
// 	            user_name: fields.username,
//                 user_password: fields.password,
// 		    }
//         console.log(JSON.stringify(user) + "AVVVVVVVVVVVVVVVVVVVV");

//         con.getConnection(function(err) {
//             if (err) throw err;
//             con.query("SELECT count(*) as re FROM user_signup where user_name = '"+fields.username+"' and user_password="+fields.password+";", function (err, result, fields) {
//               if (err) throw err;
//               re = result;
//               console.log(fields);
//               if(re[0].re == '0'){
//                 res.render('login', {
//                     username: '',
//                     password: '',
//                         data: "Invalid username / password"
//                     })
//               }else{
//                 con.getConnection(function(err) {
//                     if (err) throw err;
//                     con.query("SELECT * FROM products ORDER BY product_id LIMIT 0,10", function (err, result, fields) {
//                       if (err) throw err;
//                       re = result;
//                       //console.log(result[0].src);
//                       res.render('detail2', {
//                         title: 'Landing Page',
//                         data: result
//                     })
//                 })      

//                   });

//               }
//             //   
//         })      

//           });
//  });
//     }
//     else {   //Display errors to user
//         var error_msg = ''
//         errors.forEach(function(error) {
//             error_msg += error.msg + '<br>'
//         })                
//         req.flash('error', error_msg)        

//         res.render('add', { 
//             title: req.body.title,
//             author: req.body.author,
//             src: req.body.src
//         })
//     }
// });


// app.post('/signups', async (req, res, next) =>{    

//     var errors = req.validationErrors()
//     if( !errors ) {   //No errors were found.  Passed Validation!

//         var user = {};

// 		var form = new formidable.IncomingForm();
//          form.parse(req, async function (err, fields, files) {

//             try{
//                 const hashedPassword = await bcrypt.hash(fields.password, 10);
//                 console.log(fields.password + " and hashed password: "+hashedPassword);
//                 console.log(fields.username);
//                 user = {
//                         user_name: fields.username,
//                         user_password: hashedPassword,
//                     }
//                     con.getConnection(function(err) {
//                         if (err) throw err;
//                         con.query("SELECT count(*) as re FROM user_signup where user_name = '"+fields.username+"'", function (err, result, fields) {
//                           if (err) throw err;
//                           re = result;
//                           if(re[0].re != '0'){
//                             res.render('signup', {
//                                 username: '',
//                                 password: '',
//                                     data: "This Username is already taken. Please try another username."
//                                 })
//                           }else{
//                             con.getConnection(function(error, conn) {
//                                 con.query('INSERT INTO user_signup SET ?', user, function(err, result) {
//                                     if (err) {
//                                         console.log(err);
//                                         res.render('signup', {
//                                             username: user.username,
//                                             password: user.password,
//                                             data: ''
//                                         })
//                                     } else {                
//                                         res.render('signup', {
//                                             username: '',
//                                             password: '',
//                                             data: ''
//                                         })
//                                     }
//                                 })
//                             })
//                           }
//                     })      

//                       });
//             }

//             catch{}
//         console.log(JSON.stringify(user) + "AVVVVVVVVVVVVVVVVVVVV");


//  });
//     }
//     else {   //Display errors to user
//     //     var error_msg = ''
//     //     errors.forEach(function(error) {
//     //         error_msg += error.msg + '<br>'
//     //     })                
//     //     req.flash('error', error_msg)        

//     //     res.render('add', { 
//     //         title: req.body.title,
//     //         author: req.body.author,
//     //         src: req.body.src
//     //     })
//     }
// });

// app.get('/product-detail/(:id)', function(req, res, next) {
//     //console.log(req.params.id);
//         con.getConnection(function(err) {
//       if (err) throw err;
//       console.log(req.params.id);
//       con.query("SELECT * FROM products where product_id =  " + req.params.id , function (err, result, fields) {
//         if (err) throw err;
//         re = result;
//         //console.log(result[0].src);
//         //console.log(re);
//         res.render('detail', {
//                 title: 'Song List', 
//                         data: result
//                     })
//       });
//     });

//     });

// app.get('/signup', function(req, res, next) {
//     //console.log(req.params.id);

//     res.render('signup', {
//         title: 'Signup or Login', 

//             })

//     });


//     app.get('/test/(:id)', function(req, res, next) {
//         //console.log(req.params.id);

//         con.getConnection(function(err) {
//             if (err) throw err;
//             console.log(req.params.id);
//             con.query("SELECT * FROM products where product_id =  " + req.params.id , function (err, result, fields) {
//               if (err) throw err;
//               re = result;
//               //console.log(result[0].src);
//               //console.log(re);
//               res.render('test', {
//                       title: 'Song List', 
//                               data: result
//                           })
//             });
//           });
//         });


// // app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
//   });

//   // error handler middleware
//   app.use((error, req, res, next) => {
//     /*  
//     res.status(error.status || 500).send({
//         error: {
//           status: error.status || 500,
//           message: error.message || 'Internal Server Error',
//         },
//       });
//       */
//      res.render("pageNotFound");
//     //  res.sendFile("C:/Users/Vikas/Documents/GitHub/myfirstapp/views/pageNotFound.ejs");
//     });

// Home page for the music app.
app.get('/', function (req, res, next) {

  res.render('winter', {
    title: 'Song List',
    data: result
  });

});


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  /*  
  res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
    */
  res.render("pageNotFound");
  //  res.sendFile("C:/Users/Vikas/Documents/GitHub/myfirstapp/views/pageNotFound.ejs");
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

/*
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
  res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write(data);
    return res.end();
  });
}).listen(1337);
*/




/*
app.post('/add', function(req, res, next){
    //req.assert('name', 'Name is required').notEmpty()           //Validate name
    //req.assert('age', 'Age is required').notEmpty()             //Validate age
    //req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!

        /*
        Express-validator module

        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';

        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        */
        //var input = JSON.parse(JSON.stringify(req.body));
		//console.log(req.body);

/**
 *var song = {
    songname: req.sanitize('title').escape().trim(),
    author: req.sanitize('author').escape().trim(),
    src: req.sanitize('src').escape().trim()
}
 * /

var song = {};
	
var form = new formidable.IncomingForm();
form.parse(req, function (err, fields, files) {
	
song = {
      title: fields.title,
        author: fields.author,
        src: files.filetoupload.name
}
console.log(JSON.stringify(song) + "VVVVVVVVVVVVVVVVVVVV");	
var oldpath = files.filetoupload.path;
var newpath = '/home/vikky/myfirstapp/mymusicapp/' + files.filetoupload.name;
//var newpath = '/home/ubuntu/myfirstapp/mymusicapp/' + files.filetoupload.name;
//var newpath = 'C:/Users/Vikas/mymusicapp/' + files.filetoupload.name;
fs.rename(oldpath, newpath, function (err) {
if (err) throw err;
//res.write('File uploaded and moved!');
//res.end();
});
 
con.getConnection(function(error, conn) {
    con.query('INSERT INTO songs SET ?', song, function(err, result) {
        //if(err) throw err
        if (err) {
            //req.flash('error', err)
            console.log(err);
            // render to views/user/add.ejs
            res.render('add', {
                title: song.title,
          author: song.author,
          src: song.src
            })
        } else {                
            //req.flash('success', 'Data added successfully!')
            // render to views/user/add.ejs
            res.render('add', {
                title: '',
          author: '',
          src: ''                    
            })
        }
    })
})
});
	
 
}
else {   //Display errors to user
var error_msg = ''
errors.forEach(function(error) {
    error_msg += error.msg + '<br>'
})                
req.flash('error', error_msg)        
 
/**
 * Using req.body.name 
 * because req.param('name') is deprecated
 * / 
res.render('add', { 
    title: req.body.title,
    author: req.body.author,
    src: req.body.src
})
}
});

app.get('/(:id)', function(req, res, next) {
//console.log(req.params.id);
con.getConnection(function(err) {
if (err) throw err;
console.log(req.params.id);
con.query("SELECT * FROM songs ORDER BY song_id LIMIT " + req.params.id +",10", function (err, result, fields) {
if (err) throw err;
re = result;
//console.log(result[0].src);
//console.log(re);
res.render('winter', {
title: 'Song List', 
          data: result
        })
});
});

});*/

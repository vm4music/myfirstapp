
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
var mysql = require('mysql');
var con = mysql.createPool({
connectionLimit : 100,
  host: "localhost",
  user: "root",
  password: "root",
  database: "myshop"
});
module.exports = function(passport){

// var user = {user_name: 'vikas'}
  passport.serializeUser((user, done) => done(null, user.user_id))
  passport.deserializeUser((id, done) => {
    con.getConnection(function(err) {
  if (err) throw err;
    con.query("SELECT * FROM user_signup where user_id=?",[id], function (err, result) {
    if (err) throw err;
    return done(err, result[0])
});
    
  })
  })
const authenticateUser = async (username, password, done) => {

con.getConnection(async function(err) {
  if (err) throw err;
    con.query("SELECT * FROM user_signup where user_name=?",[username], async function (err, result) {
    if(err)
      return done(err);
    if(result.length == 0)
      return done(null, false, { message: 'Invalid Username' })
    try{
          if (await bcrypt.compare(password, result[0].user_password)) {
        return done(null, result[0])
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    }catch(e){
      return done(e);
    }
  });
      });
          }   
          
passport.use(new LocalStrategy( authenticateUser))

  }
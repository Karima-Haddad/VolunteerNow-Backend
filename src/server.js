// Connection to DB
require('./config/connection');


// CORS import 
const cors = require("cors");




require('dotenv').config();

// Express import
const express = require('express');
const app = express();


//IMPORT SESSION + PASSPORT
const session = require("express-session");
const passport = require("./config/googleStrategy");


// Accept Json Data Type
app.use(express.json());  
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
app.use('/uploads', express.static('uploads'));


//Passeport
app.use(
  session({
    secret: "volunteernow",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Routes import
const loginRouter =  require('./routes/login');
const profileRouter = require('./routes/profil');
const googleAuthRouter = require("./routes/googleAuth");
const eventRouter  = require('./routes/event');
const statsRoute = require('./routes/statsRoutes')

// Route prefix
app.use('/auth',loginRouter);
app.use('/profil',profileRouter);
app.use('/authgoogle',googleAuthRouter);
app.use('/evenements',eventRouter);
app.use('/stats',statsRoute);

// Server listener
app.listen(3000,()=>{
    console.log('server work');   
});



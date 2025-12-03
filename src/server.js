require('dotenv').config();

// Connection à la DB
require('./config/connection');

// Express import
const express = require('express');
const app = express();

// IMPORT SESSION
const session = require("express-session");
// const passport = require("./config/googleStrategy");

// Accepter JSON
app.use(express.json());

// Session
app.use(
  session({
    secret: "volunteernow",
    resave: false,
    saveUninitialized: false,
  })
);

// passport si nécessaire
// app.use(passport.initialize());
// app.use(passport.session());

// ===== Routes import =====
const loginRouter =  require('./routes/login');
const profileRouter = require('./routes/profil');
// const googleAuthRouter = require("./routes/googleAuth");
const eventRouter  = require('./routes/event');
const authRouter = require("./routes/auth");
const eventsListRoutes = require("./routes/eventsListRoutes");
const eventManagementRoutes = require("./routes/eventManagementRoutes"); // <- corrigé ici

// ===== Route prefix =====
app.use('/auth', loginRouter);
app.use('/profil', profileRouter);
// app.use('/authgoogle', googleAuthRouter);
app.use('/evenements', eventRouter);
app.use("/inscription", authRouter);  
app.use("/events-list", eventsListRoutes);
app.use("/api/events", eventManagementRoutes); // <- corrigé ici

// Server listener
app.listen(3000,()=>{
    console.log('server work');   
});

//zef
const membersBL = require("./models/membersBL");
const moviesBL = require("./models/moviesBL");
const express = require('express');
const subscriptionsRouter = require('./routers/subscriptionsRouter');
const membersRouter = require('./routers/membersRouter');
const moviesRouter = require('./routers/moviesRouter');
const usersRouter = require('./routers/usersRouter');
const cinemaSubscriptionsRouter = require('./routers/subscriptionsExtendRouter');
const cinemaMembersRouter = require('./routers/membersExtendRouter');
const cinemaMoviesRouter = require('./routers/moviesExtendRouter');

const cors = require('cors');

//------------------------Subscriptions WS Server------------------------------------------//
require('./configs/subscriptionsDatabase');
const subscriptionsWS = express();
//Allowing get requests (access) from any unknown domains 
subscriptionsWS.use(cors());

//Allowing get POST and PUT requests
subscriptionsWS.use(express.json());
subscriptionsWS.use(express.urlencoded({extended : false}));

subscriptionsWS.use('/api/subscriptions', subscriptionsRouter);
subscriptionsWS.use('/api/members', membersRouter);
subscriptionsWS.use('/api/movies', moviesRouter);

async function mySeeder() {
    await membersBL.insertMembersToDB();
    await moviesBL.insertMoviesToDB();
}

mySeeder();

subscriptionsWS.listen(3001, () => {
    console.log('Subscriptions service started on port 3001');
});
//--------------------------Cinema WS Server----------------------------------------//
require('./configs/usersDatabase');
const cinemaWS = express();
//Allowing get requests (access) from any unknown domains 
cinemaWS.use(cors());

//Allowing get POST and PUT requests
cinemaWS.use(express.json());
cinemaWS.use(express.urlencoded({extended : false}));

cinemaWS.use('/api/cinema/users', usersRouter);
cinemaWS.use('/api/cinema/subscriptions',cinemaSubscriptionsRouter);
cinemaWS.use('/api/cinema/members', cinemaMembersRouter);
cinemaWS.use('/api/cinema/movies', cinemaMoviesRouter);

cinemaWS.listen(3000, () => {
    console.log('Cinema service started on port 3000');
});

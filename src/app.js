import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import initRouter from './router';
import initTwitter from './twitterApi';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

initRouter(app);
initTwitter();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

// import Passport
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./config/passport'); //odpala bezposrednio scrypt z passport

// import Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// ustawienie handlebars do zarzadzania widokami
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

// uruchomienie sesji oraz integracja aplikacji z Passport
app.use(session({secret: 'anything'}));
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

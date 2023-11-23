const express = require('express')
const app = new express()
const ejs = require('ejs')
const expressSession = require('express-session')
app.use(express.static('public'))

const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const flash = require('connect-flash')
const newPostController = require('./controllers/newPost')
const homePageController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const validationMiddleware = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticationMiddleware = require('./middleware/redirectIfAuthenticationMiddleware')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginPostController = require('./controllers/loginPost')
const logoutController = require('./controllers/logout')

mongoose.connect('mongodb+srv://developerpirayiri:Mb9inc123@cluster0.k37lkzo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())
app.use(flash())
app.use(expressSession({
    secret: 'ConestogaStudents'
}))

global.loggedIn = null;

app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})


app.use('/post/store', validationMiddleware)


app.set('view engine', 'ejs')

app.listen(4001, () => {
    console.log('App listening at port 4001');
})
//app.set('views', path.join(__dirname, 'views'))

app.get('/', homePageController);

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/posts', (req, res) => {
    res.render('post');
})

app.get('/post/new', authMiddleware, newPostController);

app.get('/post/:id', getPostController);



app.post('/post/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticationMiddleware, newUserController)
app.post('/auth/register', redirectIfAuthenticationMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticationMiddleware, loginController)
app.post('/auth/login', redirectIfAuthenticationMiddleware, loginPostController)
app.get('/auth/logout', logoutController)
//TODO app.use((req,res) => {r} )
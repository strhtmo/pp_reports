const express = require('express');
const Controller = require('./controllers/controller');
const app = express();
const port = 3000
const session = require('express-session')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'KEPOOOOOOO',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, samsite: true }
}))

app.get('/',  Controller.getHome)
app.get('/login', Controller.login)
app.post('/login', Controller.postLogin)
app.get('/register', Controller.register)
app.post('/register', Controller.saveRegister)
app.get('/register/userprofile', Controller.userProfile)
app.post('/register/userprofile', Controller.saveUserProfile)
app.get('/logout', Controller.logOut)

app.use(function (req, res, next) {
    if(!req.session.email){
        const error = 'Please login first'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})


const isAdmin = function (req, res, next) {
    if(req.session.email && req.session.role !== 'admin'){
        const error = 'You dont have permision!! Please login to Admin'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}


app.get('/home',  Controller.landingUser)
app.get('/reports/:id/detail/:userId', Controller.detailReport)
app.get('/reports', isAdmin, Controller.reportList)
app.get('/reports/add', isAdmin, Controller.createReport)
app.post('/reports/add', isAdmin, Controller.saveNewReport)
app.get('/reports/:id/edit', isAdmin, Controller.getEdit)
app.post('/reports/:id/edit', isAdmin, Controller.postEdit)
app.get('/reports/:id/delete', isAdmin, Controller.deleteReport)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

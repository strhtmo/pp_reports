const express = require('express');
const Controller = require('./controllers/controller');
const app = express();
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', Controller.getHome)
app.get('/reports', Controller.reportList)
app.get('/reports/add', Controller.createReport)
app.post('/reports/add', Controller.saveNewReport)
app.get('/reports/:id/detail', Controller.detailReport)
app.get('/reports/:id/delete', Controller.deleteReport)
// app.get('/users/:id', Controller.userList)
// app.get('/users/delete', Controller.deleteUser)








app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const { Report, User, UserProfile } = require('../models')
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const formatDate = require('../helpers/formatter')

class Controller {
  static getHome(req, res) {
    res.render('home')
  }

  static reportList(req, res) {
    const { search } = req.query

    const options = {}

    if (search) {
      options.where = {
        title: {
          [Op.iLike]: `%${search}%`
        }
      }
    }
    // console.log(options);
    Report.findAll(options)
      .then(reports => {
        // res.send(reports)
        res.render('reportList', { reports })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static landingUser(req, res) {
    const { search } = req.query

    const options = {}

    if (search) {
      options.where = {
        title: {
          [Op.iLike]: `%${search}%`
        }
      }
    }
    Report.findAll(options)
      .then(data => {
        res.render('landingUser', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static createReport(req, res) {
    const {error} = req.query
    User.findAll()
      .then(data => {
        // res.send(data)
        res.render('add', { data, error })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static saveNewReport(req, res) {
    const { title, imgUrl, topic, description, UserId } = req.body
    Report.create({ title, imgUrl, topic, description, UserId })
      .then(reports => {
        res.redirect('/reports')
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          err = err.errors.map(el => el.message)
        }
          res.redirect(`/reports/add?error=${err}`)
    })
  }

  static detailReport(req, res) {
    const { id } = req.params

    Report.findOne({
      include: [User],
      where: +id
    })
      .then(report => {
        res.render('detailReport', { report, formatDate })
      })
      .catch(err => {

        res.send(err)
      })
  }

  static getEdit(req, res){
    const { id } = req.params
    const { error } = req.query
    let users 

    User.findAll()
    .then((result) => {
      users = result
      return Report.findByPk(id, {
      include: [User]
      })
    })
    .then((report) => {
      res.render('editReport', { users, report, error })
    })
    .catch(err => {
        res.send(err)
    })
  }

  static postEdit(req, res){
    const { id } = req.params
    // console.log(req.body)
    const body = req.body
    Report.update(body, {
      where: { id: +id }
    })
    .then(result => {
      res.redirect(`/reports/${+id}/detail`)
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        err = err.errors.map(el => el.message)
    } else {
      res.redirect(`/reports/${+id}/edit?error=${err}`)
    }
    })
  }

  static deleteReport(req, res) {
    const id = req.params.id
    Report.destroy({
      where: { id }
    })
      .then(data => {
        res.redirect('/reports')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static login(req, res) {
    const { error } = req.query
    res.render('login-form', {error})
  }

  static register(req, res) {
    res.render('register-form')
  }

  static userProfile(req, res) {
    User.findAll()
      .then(data => {
        res.render('userProfile', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static saveUserProfile(req, res) {
    const { firstName, lastName, age, gender, UserId } = req.body

    

    UserProfile.create({ firstName, lastName, age, gender, UserId })
      .then(data => {
        res.redirect('/login')
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
            res.send(err.errors.map(el => el.message))
        } else {
            res.send(err)
        }
    })
  }

  static saveRegister(req, res) {
    const { userName, email, password, role } = req.body
    User.create({ userName, email, password, role })
      .then(newUser => {
        res.redirect('/register/userprofile')
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
            res.send(err.errors.map(el => el.message))
        } else {
            res.send(err)
        }
    })
  }

  static postLogin(req, res) {
    const { email, password } = req.body
    User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password)

          if (isValidPassword) {

            req.session.email = user.email
            req.session.role = user.role

            return res.redirect('/home')
          } else {
            const error = 'invalid email/password';
            return res.redirect(`/login?error=${error}`)
          }
        } else {
          const error = 'invalid email/password';
          return res.redirect(`/login?error=${error}`)
        }
      })
      .catch(err => {
        res.send(err)
      })
  }

  static logOut(req, res) {
    req.session.destroy((err) => {
      if(err) {
        res.send(err)
      } else {
        res.redirect('/login')
      }
    })
  }

  // static getUserProfile(req, res) {
  //   User.findAll()
  //   .then(data => {
  //     res.send(data)
  //     // res.render('user', { data })
  //   })
  //   .catch(err => {
  //     res.send(err)
  //   })
  // }


}

module.exports = Controller
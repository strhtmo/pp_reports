const {Report, User, UserProfile} = require('../models')
const { Op } = require("sequelize");

class Controller {
    static getHome(req, res) {
        res.render('home')
    }

    static reportList(req, res){
        const { search } = req.query

        const options = {}

        if (search) {
            options.where = {
                title: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }
        console.log(options);
        Report.findAll(options)
        .then(reports => {
            // res.send(reports)
            res.render('reportList', {reports})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static createReport(req, res){
        User.findAll()    
        .then(data => {
            // res.send(data)
            res.render('add', { data })
        })
        .catch(err => {
            res.send(err)
        })
      }
      
      static saveNewReport(req, res){
        const {title, imgUrl, topic, description, UserId} = req.body
        Report.create({title, imgUrl, topic, description, UserId})
        .then(reports => {
          res.redirect('/reports')
        })
        .catch(err => {
          res.send(err)
        })
      }
      
      static detailReport(req, res){
        const {id} = req.params
        Report.findOne({
          include: [User],
          where: +id
        })
        .then(report => {
            // res.send(report)
          res.render('detailReport', {report})
        })
        .catch(err => {
            
          res.send(err)
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
}

module.exports = Controller
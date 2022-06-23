'use strict';
const {
  Model
} = require('sequelize');

let Filter = require('bad-words');

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Report.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }

    get cleanWords() {
      let filter = new Filter()
      filter.addWords('tolol', 'dongo', 'cuki', 'bego', 'kampret', 'bangsat', 'anjing'); // Add your own words
      return filter.clean(this.description)
    }
  }
  Report.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'Title is required'
        },
        notNull : {
          msg: 'Title is required'
        }
      }
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'ImgUrl is required'
        },
        notNull : {
          msg: 'ImgUrl is required'
        }
      }
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'Topic is required'
        },
        notNull : {
          msg: 'Topic is required'
        }
      }
    },
    description:  {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'Description is required'
        },
        notNull : {
          msg: 'Description is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'Writter is required'
        },
        notNull : {
          msg: 'Writter is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};
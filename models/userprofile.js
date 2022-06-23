'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }
  }

  UserProfile.init({
    firstName:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'firstName is required'
        },
        notNull : {
          msg: 'firstName is required'
        }
      }
    },
    lastName: DataTypes.STRING,
    age:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'age is required'
        },
        notNull : {
          msg: 'age is required'
        }
      }
    },
    gender:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'gender is required'
        },
        notNull : {
          msg: 'gender is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'UserId is required'
        },
        notNull : {
          msg: 'UserId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};
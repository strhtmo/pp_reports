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

    get newFullname() {
      return `${this.firstName} ${this.lastName}`
    }
  }

  UserProfile.init({
    firstName:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'First Name is required'
        },
        notNull : {
          msg: 'First Name is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'Last Name is required'
        },
        notNull : {
          msg: 'Last Name is required'
        }
      }
    },
    age:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'Age is required'
        },
        notNull : {
          msg: 'Age is required'
        }
      }
    },
    gender:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'Gender is required'
        },
        notNull : {
          msg: 'Gender is required'
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
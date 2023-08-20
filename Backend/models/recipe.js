const sequelize = require("sequelize");
const { seq } = require("../config/config");


  const Recipe = seq.define("Recipe", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: sequelize.INTEGER
    },
    title: {
      type: sequelize.STRING
    },
    image: {
      type: sequelize.STRING
    },
    imageType: {
      type: sequelize.STRING,
      defaultValue: "jpg"
    },
    createdAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    userId:{
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    }

  });
  
module.exports={Recipe}
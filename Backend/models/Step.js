module.exports = (sequelize, DataTypes) => {
    const Step = sequelize.define("Step", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      step_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      length_number: {
        type: DataTypes.INTEGER,
      },
      length_unit: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      recipeId:{
        type: DataTypes.INTEGER,
        references: {
          model: "Recipe",
          key: "id"
        },
      }
  
    });
    return Step;
  };
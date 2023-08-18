module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("Ingredient", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      local_name: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      stepId:{
        type: DataTypes.INTEGER,
        references: {
          model: "Step",
          key: "id"
        },
      }
  
    });
    return Ingredient;
  };
const { DataTypes, Sequelize, NOW } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATEONLY,
      defaultValue: NOW,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    plataforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

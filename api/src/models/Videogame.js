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
      validate: {
        min: 1,
        max: 5,
      },
    },
    plataforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlImg: {
      type: DataTypes.STRING,
      defaultValue:
        "https://m.media-amazon.com/images/I/51TSmpP19yL._AC_SX466_.jpg",
    },
  });
};

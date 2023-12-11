// models/album.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Album = sequelize.define('Album', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    band: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false, // Desabilita os campos 'createdAt' e 'updatedAt'
  });

  return Album;
};


'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    time: DataTypes.TIME,
    with: DataTypes.STRING,
    reason: DataTypes.STRING,
    kidId: DataTypes.INTEGER
  }, {});
  event.associate = function(models) {
    // associations can be defined here
  };
  return event;
};
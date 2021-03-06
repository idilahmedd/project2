'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    time: DataTypes.TIME,
    with: DataTypes.STRING,
    reason: DataTypes.STRING,
    kidId: DataTypes.INTEGER,
    docId: DataTypes.STRING,
    playId: DataTypes.INTEGER
  }, {});
  event.associate = function(models) {
    // associations can be defined here
    models.event.belongsTo(models.kid);
    // models.event.hasMany(models.note);
  };
  return event;
};
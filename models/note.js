'use strict';
module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define('note', {
    time: DataTypes.TIME,
    content: DataTypes.STRING,
    eventId: DataTypes.INTEGER
  }, {});
  note.associate = function(models) {
    // associations can be defined here
    // models.note.belongsTo(models.event); 
  };
  return note;
};
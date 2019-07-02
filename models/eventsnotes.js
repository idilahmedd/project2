'use strict';
module.exports = (sequelize, DataTypes) => {
  const eventsNotes = sequelize.define('eventsNotes', {
    eventId: DataTypes.INTEGER,
    noteId: DataTypes.INTEGER
  }, {});
  eventsNotes.associate = function(models) {
    // associations can be defined here
  };
  return eventsNotes;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const kid = sequelize.define('kid', {
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {});
  kid.associate = function(models) {
    // associations can be defined here
    models.kid.belongsTo(models.user);
    models.kid.hasMany(models.event); 

  };
  return kid;
};
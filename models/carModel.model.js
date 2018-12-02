const {TE, to}              = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  
  var Model = sequelize.define('carModel', {
    name_th: DataTypes.STRING,
    name_en: DataTypes.STRING,
    description: DataTypes.STRING,
    brand_id: DataTypes.STRING
  });

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
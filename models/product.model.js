const {TE, to}              = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Product', {
    product_code: DataTypes.STRING,
    product_name: DataTypes.STRING,
    product_description: DataTypes.STRING,
    brand_id: DataTypes.STRING,
    model_id: DataTypes.STRING,
    year: DataTypes.STRING,
  });

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
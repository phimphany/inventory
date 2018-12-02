const { carModel } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const carmodel = require('../models').carModel;

const create = async function(req, res){
    let err, product;
    let user = req.user;

    let carmodel_info = req.body;

    [err, carmodel] = await to(carModel.create(carmodel_info));
    if(err) return ReE(res, err, 422);

    carmodel.addUser(user, { through: { status: 'started' }})

    [err, carmodel] = await to(carmodel.save());
    if(err) return ReE(res, err, 422);

    let carmodel_json = carmodel.toWeb();
    carmodel_json.users = [{user:user.id}];

    return ReS(res, {carmodel:carmodel_json}, 201);
}
module.exports.create = create;

const getAll = function(req, res){
    return carmodel
      .findAll(
          {
            order: [
                ['createdAt', 'DESC'],
              ],
          }
      )
      .then(carmodels => res.status(200).send(carmodels))
      .catch(error => res.status(400).send(error));
  }

module.exports.getAll = getAll;

const get = function(req, res){
    const id = parseInt(req.params.id);
    return carmodel.findById(id)
        .then(carmodel => res.status(200).send(carmodel))
        .catch(error => res.status(400).send(error));
}

module.exports.get = get;

const getModelByBrand = function(req, res){
    const id = parseInt(req.params.id);
    return carmodel.findAll({
        where:{brand_id:id}
    }).then(carmodels => res.status(200).send(carmodels))
        .catch(error => res.status(400).send(error));
}

module.exports.getModelByBrand = getModelByBrand;

const update = async function(req, res){
    let err, carmodel, data;
    carmodel = req.carmodel;
    data = req.body;
    carmodel.set(data);

    [err, carmodel] = await to(carmodel.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {carmodel:carmodel.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let carmodel, err;
    carmodel = req.carmodel;

    [err, carmodel] = await to(carmodel.destroy());
    if(err) return ReE(res, 'error occured trying to delete the carmodel');

    return ReS(res, {message:'Deleted carmodel'}, 204);
}
module.exports.remove = remove;
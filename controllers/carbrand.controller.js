const { carBrand } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const carbrand = require('../models').carBrand;

const create = async function(req, res){
    let err, product;
    let user = req.user;

    let carbrand_info = req.body;


    [err, carbrand] = await to(carBrand.create(carbrand_info));
    if(err) return ReE(res, err, 422);

    carbrand.addUser(user, { through: { status: 'started' }})

    [err, carbrand] = await to(carbrand.save());
    if(err) return ReE(res, err, 422);

    let carbrand_json = carbrand.toWeb();
    carbrand_json.users = [{user:user.id}];

    return ReS(res, {carbrand:carbrand_json}, 201);
}
module.exports.create = create;

const getAll = function(req, res){
    return carbrand
      .findAll(
          {
            order: [
                ['createdAt', 'DESC'],
              ],
          }
      )
      .then(carbrands => res.status(200).send(carbrands))
      .catch(error => res.status(400).send(error));
  }

module.exports.getAll = getAll;

const get = function(req, res){
    let carbrand = req.carbrand;

    return ReS(res, {carbrand:carbrand.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, carbrand, data;
    carbrand = req.carbrand;
    data = req.body;
    carbrand.set(data);

    [err, carbrand] = await to(carbrand.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {carbrand:carbrand.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let carbrand, err;
    carbrand = req.carbrand;

    [err, carbrand] = await to(carbrand.destroy());
    if(err) return ReE(res, 'error occured trying to delete the carbrand');

    return ReS(res, {message:'Deleted carbrand'}, 204);
}
module.exports.remove = remove;
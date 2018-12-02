const { Product } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const product = require('../models').Product;

const create = async function(req, res){
    let err, product;
    let user = req.user;

    let product_info = req.body;


    [err, product] = await to(Product.create(product_info));
    if(err) return ReE(res, err, 422);

    product.addUser(user, { through: { status: 'started' }})

    [err, product] = await to(product.save());
    if(err) return ReE(res, err, 422);

    let product_json = product.toWeb();
    product_json.users = [{user:user.id}];

    return ReS(res, {product:product_json}, 201);
}
module.exports.create = create;

const getAll = function(req, res){
    return product
      .findAll(
          {
            order: [
                ['createdAt', 'DESC'],
              ],
          }
      )
      .then(products => res.status(200).send(products))
      .catch(error => res.status(400).send(error));
  }

module.exports.getAll = getAll;

const get = function(req, res){
    let product = req.product;

    return ReS(res, {product:product.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, product, data;
    product = req.product;
    data = req.body;
    product.set(data);

    [err, product] = await to(product.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {product:product.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let product, err;
    product = req.product;

    [err, product] = await to(product.destroy());
    if(err) return ReE(res, 'error occured trying to delete the product');

    return ReS(res, {message:'Deleted product'}, 204);
}
module.exports.remove = remove;
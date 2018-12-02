const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const ProductController = require('../controllers/product.controller');
const CarBrandController = require('../controllers/carbrand.controller');
const CarModelController = require('../controllers/carmodel.controller');
const HomeController 	= require('../controllers/home.controller');

const custom 	        = require('../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


require('../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users',           UserController.create);                                                    // C
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);

router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C
router.get(     '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  // R

router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
router.put(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  // U
router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)

//********* Products API **********
router.post(    '/products',             passport.authenticate('jwt', {session:false}), ProductController.create);                  // C
router.get(     '/products',             passport.authenticate('jwt', {session:false}), ProductController.getAll);                  // R

//********* Car Brands API **********
router.post(    '/carbrands',             passport.authenticate('jwt', {session:false}), CarBrandController.create);                  // C
router.get(     '/carbrands',             passport.authenticate('jwt', {session:false}), CarBrandController.getAll);                  // R

//********* Car Models API **********
router.post(    '/carmodels',             passport.authenticate('jwt', {session:false}), CarModelController.create);                  // C
router.get(     '/carmodels',             passport.authenticate('jwt', {session:false}), CarModelController.getAll);                  // R
router.get(     '/carmodels/:id',         passport.authenticate('jwt', {session:false}), CarModelController.get);                  // R
router.get(     '/carmodels/brand/:id',   passport.authenticate('jwt', {session:false}), CarModelController.getModelByBrand);                  // R

//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;

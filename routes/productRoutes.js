const productsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS
    app.get('/api/products/findByCategory/:id_category',  passport.authenticate('jwt', { session: false }),  productsController.findByCategory);
    app.get('/api/products/findByNameAndCategory/:id_category/:name',  passport.authenticate('jwt', { session: false }),  productsController.findByNameAndCategory);
    app.get('/api/products/findByVisitorAndStatus/:id_visitor/:status_product',  passport.authenticate('jwt', { session: false }),  productsController.findByVisitorAndStatus);
    app.get('/api/products/findByResidentAndStatus/:id_resident/:status_product',  passport.authenticate('jwt', { session: false }),  productsController.findByResidentAndStatus);
    
    app.post('/api/products/create',  passport.authenticate('jwt', { session: false }), upload.array('image', 3), productsController.create);


}
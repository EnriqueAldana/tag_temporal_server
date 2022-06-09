const categoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> Obtener datos
    // POST -> ALMACENAR datos
    // PUT -> Actualizar datos
    // DELETE -> Borrar datos

    app.post('/api/categories/create', passport.authenticate('jwt', { session: false}),   categoriesController.create);


}
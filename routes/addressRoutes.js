const addressController = require('../controllers/addressController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> Obtener datos
    // POST -> ALMACENAR datos
    // PUT -> Actualizar datos
    // DELETE -> Borrar datos

    app.get('/api/address/getAll', passport.authenticate('jwt', { session: false}),   addressController.getAll);
    app.post('/api/address/create', passport.authenticate('jwt', { session: false}),   addressController.create);

}
const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> Obtener datos
    // POST -> ALMACENAR datos
    // PUT -> Actualizar datos
    // DELETE -> Borrar datos

      app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', { session: false}),   OrdersController.findByStatus);
      app.get('/api/orders/findByVisitorAndStatus/:id_visitor/:status', passport.authenticate('jwt', { session: false}),   OrdersController.findByVisitorAndStatus);
      app.post('/api/orders/create', passport.authenticate('jwt', { session: false}),   OrdersController.create);
      app.put('/api/orders/updateStatus', passport.authenticate('jwt', { session: false}),   OrdersController.updateStatus);

}
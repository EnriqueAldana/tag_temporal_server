const OrderHasProductsController = require('../controllers/order_has_productController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> Obtener datos
    // POST -> ALMACENAR datos
    // PUT -> Actualizar datos
    // DELETE -> Borrar datos
      app.put('/api/order_has_product/updateStatus', passport.authenticate('jwt', { session: false}),  OrderHasProductsController.updateStatus);
      app.put('/api/order_has_product/updateLatLng', passport.authenticate('jwt', { session: false}),  OrderHasProductsController.updateLatLng);
      app.get('/api/order_has_product/getOrderProduct/:idOrder/:idProduct/:startDate', passport.authenticate('jwt', { session: false}),  OrderHasProductsController.getOrderHasproduct);

}


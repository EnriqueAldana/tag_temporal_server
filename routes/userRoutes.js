const usersController = require('../controllers/usersController');

module.exports = (app) => {

    // GET -> Obtener datos
    // POST -> ALMACENAR datos
    // PUT -> Actualizar datos
    // DELETE -> Borrar datos

    app.post('/api/users/create', usersController.register);
    app.post('/api/users/login', usersController.login);
}
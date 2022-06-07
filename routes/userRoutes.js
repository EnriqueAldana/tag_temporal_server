const usersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app,upload) => {

    // GET -> Obtener datos
    // POST -> ALMACENAR datos
    // PUT -> Actualizar datos
    // DELETE -> Borrar datos

    app.post('/api/users/create', usersController.register);
    app.post('/api/users/createWithImage', upload.array('image',1) ,usersController.registerWithImage);
    app.post('/api/users/login', usersController.login);

        // PENDIENTE APLICAR SEGURIDAD
    //app.put('/api/users/update', passport.authenticate('jwt',{session: false}) ,upload.array('image',1), usersController.updateWithImage);
    //app.put('/api/users/updateWithOutImage', passport.authenticate('jwt',{session: false}) ,upload.array('image',1), usersController.updateWithOutImage);
    app.put('/api/users/update' ,upload.array('image',1), usersController.updateWithImage);
    app.put('/api/users/updateWithOutImage' ,upload.array('image',1), usersController.updateWithOutImage);

}
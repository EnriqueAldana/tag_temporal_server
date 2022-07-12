const express = require('express');
const app = express();
const http= require ('http');
const server = http.createServer(app);
const logger = require ('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const io = require('socket.io')(server);
const mercadopago = require('mercadopago');
mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-3528176840473483-070618-069af9a0a8b90efeea7a35750d39c7bd-212447326'
});


/*
* Importar Sockets
*/
const ordersSocket = require('./sockets/ordersSocket');

/*
* Importar rutas
*/

const userRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/orderRoutes');
const order_has_productRoutes = require('./routes/order_has_productRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');


const port = process.env.PORT || 3000;
const ip = '192.168.1.66';

app.set('port',port);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

const upload = multer(
    { storage: multer.memoryStorage()
    }
    );


/*
* Llamado a  SOCKETS
* http://192.168.1.66:3000/orders/visitor
*/
ordersSocket(io);

/*
* Llamado de  rutas
*/
userRoutes(app,upload);
categoriesRoutes(app);
productRoutes(app, upload);
addressRoutes(app);
ordersRoutes(app);
order_has_productRoutes(app);
mercadoPagoRoutes(app);

server.listen(3000,ip || 'localhost', function() {
    console.log('Aplicacion tagTemporal Servidor en Node JS con pid ' + process.pid + ' iniciada...' + ' en el puerto: ' + port);

});

app.get('/',(req,res) => {
    res.send('Ruta raiz del back');
});

// Manejo de errores
// Error Handler
app.use((err,req,res,next)=> {
    console.log(err);
    res.status(err.status || 500).send(err.stack);

});

// Codigo de mensajes HTTP
// 200 - Es una respuesta exitosa
// 404 - La ruta del recurso solicitado no existe
// 500 - Error interno en el servidor
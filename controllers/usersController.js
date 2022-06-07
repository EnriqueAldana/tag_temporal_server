const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const env = require('../config/env')
// Fijar el rol de visitante
const rolVisitante = env.id_rol_visitante;
module .exports = {
    login(req,res){
        const email = req.body.email;
        const password = req.body.password;
        User.findByEmail(email, async (err,myUser)=> {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error en el servidor'
                });
            }
            if(!myUser){
                return res.status(401).json({ // el cliente no tiene autorizacion para realizar esta peticion
                    success: false,
                    message: 'No se encontró usuario con ese correo',
                });
             }
             const isPasswordValid= await bcrypt.compare(password,myUser.password);
             if(isPasswordValid){
                    const token = jwt.sign({id: myUser.id, email: myUser.email},keys.secretOrkey,{});
                    const infoUser = {
                        id: `${myUser.id}`, 
                        email: myUser.email,
                        name: myUser.name,
                        lastname: myUser.lastname,
                        lastname2: myUser.lastname2,
                        phone: myUser.phone,
                        image_path: myUser.image_path,
                        session_token: `JWT ${token}`,
                        roles: JSON.parse(myUser.roles)
                    }
                    return res.status(201).json({
                        success: true,
                        message: 'El usuario fué autenticado',
                        data: infoUser
                    });
                }
                else{
                    return res.status(401).json({
                        success: false,
                        message: 'La contraseña no es la correcta',
                        
                    });
                }
             

        });
    },
    register(req,res) {
        const user = req.body; // capturar los datos que el request trae
        User.create(user, (err,data)=> {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error con el registro del usuario'
                });
            }else{
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizó exitosamente',
                    data: data
                });

            }
        });
    },
    async registerWithImage(req,res) {
        const user = JSON.parse(req.body.user); // capturar los datos que el request trae
        
        const files = req.files;
        if(files.length > 0 ){
            const path = `image_${Date.now()}`;
            const url= await storage(files[0],path);
            if(url != undefined && url != null){
                user.image_path= url;
            }
        }
        User.create(user, (err,data)=> {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error con el registro del usuario'
                });
            }
            user.id=  `${data}`;
            const token = jwt.sign({id: user.id, email: user.email},keys.secretOrkey,{});
            user.session_token = `JWT ${token}`;

            // Asignar a todo usuario registrado el rol de VISITANTE
            Rol.create(user.id,rolVisitante, ( err, data) =>{
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: ' Hubo un error con el registro del usuario'
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizó exitosamente',
                    data: user
                });
            });
        });
    },
    async updateWithImage(req,res) {
        const user = JSON.parse(req.body.user); // capturar los datos que el request trae
        console.log('Usuario recibido updateWithImage ', user);
        const files = req.files;
        if(files.length > 0 ){
            const path = `image_${Date.now()}`;
            const url= await storage(files[0],path);
            if(url != undefined && url != null){
                user.image_path= url;
            }
        }
        User.update (user, (err,data)=> {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error con la actualización del usuario'
                });
            }
            User.findById(data,(error,myData) =>{
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: ' Hubo un error con la actualización del usuario'
                    });
                }
                myData.session_token = user.session_token;
                myData.roles = JSON.parse(myData.roles);
                console.log('Usuario retornado updateWithImage ', myData);
                return res.status(201).json({
                    success: true,
                    message: 'El usuario se actualizó exitosamente',
                    data: myData
                });
            });
            
        });
    },
    async updateWithOutImage(req,res) {
        const user = req.body; // capturar los datos que el request trae
        console.log('Usuario recibido updateWithOutImage ', user);
        User.updateWithOutImage (user, (err,data)=> {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error con la actualización del usuario'
                });
            }
            User.findById(data,(error,myData) =>{ 
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: ' Hubo un error con la actualización del usuario'
                    });
                }
                console.log('token ', user.session_token);
                console.log('Objeto por retornar antes de token ', myData);
                myData.session_token = user.session_token;
                myData.roles = JSON.parse(myData.roles);
                console.log('Usuario retornado ', myData);
                return res.status(201).json({
                    success: true,
                    message: 'El usuario se actualizó exitosamente',
                    data: myData
                });
            });
            
        });
    }
}

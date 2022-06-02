const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

;module .exports = {
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
                        name: myUser.name,
                        lastname: myUser.lastname,
                        lastname2: myUser.lastname2,
                        phone: myUser.phone,
                        image_path: myUser.image_path,
                        session_token: `JWT ${token}`
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
    }
}
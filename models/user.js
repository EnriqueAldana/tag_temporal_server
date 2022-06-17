const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User= {};

User.findVisitorMan = (idRol,result)=>{
    const sql = `
    SELECT 
    CONVERT(U.id, char) AS id,
    U.email,
    U.name,
    U.lastname,
    U.lastname2,
    U.image_path,
    U.phone
    FROM
    users AS U
    INNER JOIN 
    user_has_roles AS UHR
    ON
    UHR.id_user = U.id
    INNER JOIN
    roles AS R
    ON
    UHR.id_rol = R.id
    WHERE
        R.id= ?
    `;
    db.query(
        sql,
        [idRol],
        (err, data) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Usuarios obtenidos con tol Visitor', data);
                result(null, data);
            }
        }
    )

}
User.findVisitorManByName = (name,idRol,result)=>{
    const sql = `
    SELECT 
    CONVERT(U.id, char) AS id,
    U.email,
    U.name,
    U.lastname,
    U.lastname2,
    U.image_path,
    U.phone
    FROM
    users AS U
    INNER JOIN 
    user_has_roles AS UHR
    ON
    UHR.id_user = U.id
    INNER JOIN
    roles AS R
    ON
    UHR.id_rol = R.id
    WHERE
        R.id= ? AND LOWER(U.name) LIKE ?
    `;
    db.query(
        sql,
        [
            idRol,
            `%${name.toLowerCase()}%`
        ],
        (err, data) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Usuarios obtenidos con tol Visitor', data);
                result(null, data);
            }
        }
    )

}
User.findById = (id,result)=>{
    const sql =`
    SELECT 
            CONVERT(U.id, char) AS id,
            U.email,
            U.name,
            U.lastname,
            U.lastname2,
            U.image_path,
            U.phone,
            U.password,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(R.id, char),
                    'name', R.name,
                    'image', R.image,
                    'route', R.route
                )
            ) AS roles

            FROM

            users AS U

            INNER JOIN 
            user_has_roles AS UHR
            ON
            UHR.id_user = U.id

            INNER JOIN
            roles AS R
            ON
            UHR.id_rol = R.id

            WHERE
                U.id= ?

            GROUP BY
                U.id
    `;
    db.query(
        sql,
        [id],
        (err, user) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Usuario obtenido ', user[0]);
                result(null, user[0]);
            }
        }
    )

}
User.findByEmail = (email,result)=>{
    const sql =`
                SELECT 
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.lastname2,
            U.image_path,
            U.phone,
            U.password,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(R.id, char),
                    'name', R.name,
                    'image', R.image,
                    'route', R.route
                )
            ) AS roles

            FROM

            users AS U

            INNER JOIN 
            user_has_roles AS UHR
            ON
            UHR.id_user = U.id

            INNER JOIN
            roles AS R
            ON
            UHR.id_rol = R.id

        
            WHERE
                U.email= ?

            GROUP BY
                U.id
    `;
    db.query(
        sql,
        [email],
        (err, user) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Usuario obtenido ', user[0] );
                result(null, user[0]);
            }
        }
    )

}
User.create = async (user, result)=> {

    const hash = await bcrypt.hash(user.password,10);
    const sql = `
        INSERT INTO
        users(
            email,
            name,
            lastname,
            lastname2,
            phone,
            image_path,
            password,
            created_at,
            updated_at
        )
        VALUES(?,?,?,?,?,?,?,?,?)
    `;
    db.query(
        sql,[
            user.email,
            user.name,
            user.lastname,
            user.lastname2,
            user.phone,
            user.image_path,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Id del nuevo usuario ', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

User.update = (user, result) =>{
    const sql = `
        UPDATE
            users
        SET
            email = ?,
            name = ?,
            lastname = ?,
            lastname2 = ?,
            phone = ?,
            image_path = ?,
            updated_at = ?
        
        WHERE
            id = ?
    `;
    db.query(
        sql,[
            user.email,
            user.name,
            user.lastname,
            user.lastname2,
            user.phone,
            user.image_path,
            new Date(),
            user.id
        ],
        (err, res) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Usuario actualizado:  ', user.id);
                result(null, user.id);
            }
        }
    )
}

User.updateWithOutImage = (user, result) =>{
    const sql = `
        UPDATE
            users
        SET
            email = ?,
            name = ?,
            lastname = ?,
            lastname2 = ?,
            phone = ?,
            updated_at = ?
        WHERE
            id = ?
    `;
    db.query(
        sql,[
            user.email,
            user.name,
            user.lastname,
            user.lastname2,
            user.phone,
            new Date(),
            user.id
        ],
        (err, res) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Usuario actualizado:  ', user.id);
                result(null, user.id);
            }
        }
    )
}
module.exports = User;
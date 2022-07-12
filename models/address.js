const db = require('../config/config');
const { id_developer } = require('../config/env');

const Address = {};

Address.findByUser = (id_user, result) =>{
    const sql=`
    SELECT
            CONVERT(id, char) AS id,
            address_street AS address,
            external_number ,
            internal_number ,
            neighborhood ,
            state,
            country,
            postal_code,
            lat,
            lng,
            created_at ,
            updated_at ,
            CONVERT(id_user, char) AS id_user 
        FROM
            address
        WHERE
            id_user = ?
    `;
    db.query(
        sql,
        id_user,
        (err, data) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                result(null, data);
            }
        }
    )

    


}
Address.getAll = (result) => {
    const sql =`
    SELECT 
        CONVERT(id, char) AS id,
        address_street ,
        external_number ,
        internal_number ,
        neighborhood ,
        state,
        country,
        postal_code,
        lat,
        lng,
        created_at ,
        updated_at ,
        CONVERT(id_user, char) AS id_user
    FROM
        address
    ORDER BY
        id
    `;  

    db.query(
      sql,
      (err, res) => {
        if (err){
            console.log('Error:', err)
            result(err,null);
        }else{
            console.log('Todas las direcciones', res);
            result(null, res);
        }
    } 
    )

}



Address.create = (address, result) =>{
    const sql= `
    INSERT INTO
    address(
        address_street ,
        external_number ,
        internal_number ,
        neighborhood ,
        state,
        country,
        postal_code,
        lat,
        lng,
        created_at ,
        updated_at ,
        id_user 

      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    db.query(
        sql,
        [
            address.address ,
            address.external_number ,
            address.internal_number ,
            address.neighborhood ,
            address.state,
            address.country,
            address.postal_code,
            address.lat,
            address.lng,
            new Date() ,
            new Date() ,
            address.id_user 
        ],
        (err, res) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Id de la nueva direccion', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}
module.exports = Address;
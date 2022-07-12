const db = require('../config/config');
const { id_developer } = require('../config/env');

const OrderHasProducts = {};


OrderHasProducts.create = (id_order,id_product,quantity,started_date,ended_date, result) =>{
    //ASIGNADO  ENCAMINO VISITADO COMPLETADO
    const sql= `
    INSERT INTO
    order_has_products(
        id_order,
        id_product,
        quantity,
        started_date,
        ended_date,
        status_product,
        created_at,
        updated_at
      )
      VALUES (?,?,?,?,?,?,?,?)
    `;
    db.query(
        sql,
        [
            id_order,
            id_product,
            quantity,
            started_date,
            ended_date,
            'PAGADO',
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Id de la nueva orden con productos', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

OrderHasProducts.updateStatus = (id_order,id_product,started_date,status_product, result) => {
    console.log('Actualizando order product');
    console.log('id_orden ' + id_order + 'id_product ' + id_product + 'started_date ' + started_date + 'status_product ' + status_product);
    
    const sql = `
    UPDATE
        order_has_products
    SET
        status_product= ?,
        updated_at = ?
    WHERE
        id_order = ? AND id_product=? AND started_date= ?
    `;

    db.query(
        sql, 
        [
            status_product,
            new Date(),
            id_order,
            id_product,
            started_date
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Orde-Producto actualizado en su estatus ' + status_product);
                result(null, id_order);
            }
        }

    )

}
OrderHasProducts.updateGPSLatLng = (id_order,id_product,started_date,lat,lng, result) => {
    console.log('Actualizando order product lat y lng');
    console.log('id_orden ' + id_order + 'id_product ' + id_product + 'started_date ' + started_date + 'lat' + lat + 'lng' + lng);
    
    const sql = `
    UPDATE
        order_has_products
    SET
        lat= ?,
        lng= ?,
        updated_at = ?
    WHERE
        id_order = ? AND id_product=? AND started_date= ?
    `;

    db.query(
        sql, 
        [
            lat,
            lng,
            new Date(),
            id_order,
            id_product,
            started_date
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Orde-Producto actualizado en su lat y lng ' + id_order + ' ' +id_product);
                result(null, id_order);
            }
        }

    )

}
OrderHasProducts.getOrderProduct = (id_order,id_product,started_date, result) => {
    
    const sql = `
    SELECT 
	CONVERT(id_order ,char) AS id_order,
    CONVERT(id_product ,char) AS id_product,
    quantity,
    started_date,
    ended_date,
    status_product,
    lat,
    lng
    FROM order_has_products
    WHERE
        id_order = ? AND id_product=? AND started_date= ?
    LIMIT 1
    `;

    db.query(
        sql, 
        [
            id_order,
            id_product,
            started_date
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
               
                result(null, res);
            }
        }

    )

}
module.exports = OrderHasProducts;
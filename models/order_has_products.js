const db = require('../config/config');
const { id_developer } = require('../config/env');

const OrderHasProducts = {};


OrderHasProducts.create = (id_order,id_product,quantity, result) =>{
    const sql= `
    INSERT INTO
    order_has_products(
        id_order,
        id_product,
        quantity,
        started_date,
        ended_date,
        created_at,
        updated_at
      )
      VALUES (?,?,?,?,?,?,?)
    `;
    db.query(
        sql,
        [
            id_order,
            id_product,
            quantity,
            started_date,
            ended_date,
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
module.exports = OrderHasProducts;
const db = require('../config/config');
const { id_developer } = require('../config/env');

const Order = {};

Order.findByStatus = (status,result) =>{
    const sql = `
    SELECT 
	CONVERT(O.id,char) AS id,
    CONVERT(O.id_resident,char) AS id_resident ,
    CONVERT(O.id_visitor,char) AS id_visitor,
    CONVERT(O.id_address,char) AS id_address,
    O.status,
    O.timestamp,
    O.lat,
    O.lng,
    JSON_OBJECT(
		'id', CONVERT(A.id,char),
        'address', A.address_street,
        'external_number', A.external_number,
        'internal_number', A.internal_number,
        'neighborhood', A.neighborhood,
        'state', A.state,
        'country', A.country,
        'postal_code', A.postal_code,
        'lat', A.lat,
        'lng', A.lng
    ) AS address,
    JSON_OBJECT(
		'id', CONVERT(V.id,char),
        'email', V.email,
        'name', V.name,
        'lastname', V.lastname,
        'lastname2', V.lastname2,
        'phone', V.phone,
        'image_path', V.image_path
        ) AS visitor,
    JSON_OBJECT(
		'id', CONVERT(U.id,char),
        'email', U.email,
        'name', U.name,
        'lastname', U.lastname,
        'lastname2', U.lastname2,
        'phone', U.phone,
        'image_path', U.image_path
        ) AS resident,
        JSON_ARRAYAGG( 
			JSON_OBJECT( 
				"id", CONVERT(P.id,char),
                "name", P.name,
                "description", P.description,
                "image1", P.image1,
                "image2", P.image2,
                "image3", P.image3,
                "price", P.price,
                "quantity", OHP.quantity
            )
        ) AS products
    
    FROM
		orders AS O
        INNER JOIN 
        users AS U
        ON
        U.id = O.id_resident
        INNER JOIN 
        users AS V
        ON
        V.id = O.id_visitor
        INNER JOIN
		address AS A
        ON
		A.id = O.id_address
		INNER JOIN
        order_has_products AS OHP
        ON
        OHP.id_order = O.id
        INNER JOIN 
        products AS P
        ON 
        P.id= OHP.id_product
        
	WHERE
     status = ?
     GROUP BY 
     O.id;
    `;
    db.query(
        sql,
        status,
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
Order.findByVisitorAndStatus = (idVisitor,status,result) =>{
    const sql = `
    SELECT 
	CONVERT(O.id,char) AS id,
    CONVERT(O.id_resident,char) AS id_resident ,
    CONVERT(O.id_visitor,char) AS id_visitor,
    CONVERT(O.id_address,char) AS id_address,
    O.status,
    O.timestamp,
    O.lat,
    O.lng,
    JSON_OBJECT(
		'id', CONVERT(A.id,char),
        'address', A.address_street,
        'external_number', A.external_number,
        'internal_number', A.internal_number,
        'neighborhood', A.neighborhood,
        'state', A.state,
        'country', A.country,
        'postal_code', A.postal_code,
        'lat', A.lat,
        'lng', A.lng
    ) AS address,
    JSON_OBJECT(
		'id', CONVERT(V.id,char),
        'email', V.email,
        'name', V.name,
        'lastname', V.lastname,
        'lastname2', V.lastname2,
        'phone', V.phone,
        'image_path', V.image_path
        ) AS visitor,
    JSON_OBJECT(
		'id', CONVERT(U.id,char),
        'email', U.email,
        'name', U.name,
        'lastname', U.lastname,
        'lastname2', U.lastname2,
        'phone', U.phone,
        'image_path', U.image_path
        ) AS resident,
        JSON_ARRAYAGG( 
			JSON_OBJECT( 
				"id", CONVERT(P.id,char),
                "name", P.name,
                "description", P.description,
                "image1", P.image1,
                "image2", P.image2,
                "image3", P.image3,
                "price", P.price,
                "quantity", OHP.quantity
            )
        ) AS products
    
    FROM
		orders AS O
        INNER JOIN 
        users AS U
        ON
        U.id = O.id_resident
         INNER JOIN 
        users AS V
        ON
        V.id = O.id_visitor
        INNER JOIN
		address AS A
        ON
		A.id = O.id_address
		INNER JOIN
        order_has_products AS OHP
        ON
        OHP.id_order = O.id
        INNER JOIN 
        products AS P
        ON 
        P.id= OHP.id_product
        
     WHERE
     O.id_resident = ? AND status = ?
     GROUP BY 
     O.id;
    `;
    db.query(
        sql,[
            idVisitor,
            status
        ]
        ,
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
Order.create = (order, result) =>{
    const sql= `
    INSERT INTO
    orders(
        id_resident,
        id_visitor,
        id_address,
        status,
        timestamp,
        created_at,
        updated_at
      )
      VALUES (?,?,?,?,?,?,?)
    `;
    db.query(
        sql,
        [
            order.id_resident,
            order.id_visitor,
            order.id_address,
            'EMITIDO', // 1.- EMITIDO , 2.- PAGADO, 3.- ENCAMINO, 4.- VISITADO, 5.- COMPLETADO 
            Date.now(),
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Id de la nueva orden', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}
module.exports = Order;
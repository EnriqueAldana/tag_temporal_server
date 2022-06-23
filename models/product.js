const db = require('../config/config');

const Product = {};

Product.findByCategory = (id_category, result) =>{
    const sql = `
        SELECT 
        CONVERT(P.id,char) as id,
        P.name,
        P.description,
        P.validity_time_hours,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        CONVERT(P.id_category, char) as id_category
    FROM
    products as P
    WHERE
        P.id_category = ?
    `;
    db.query(
        sql,
        [id_category],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Lista de productos x categoria: ', res);
                result(null, res);
            }
        }
        
    );
}

Product.findByNameAndCategory = (name,id_category, result) =>{
    const sql = `
        SELECT 
        CONVERT(P.id,char) as id,
        P.name,
        P.description,
        P.validity_time_hours,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        CONVERT(P.id_category, char) as id_category
    FROM
    products as P
    WHERE
        P.id_category = ? AND LOWER(P.name) LIKE ?
    `;
    db.query(
        sql,
        [
            id_category, 
            `%${name.toLowerCase()}%`
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Lista de productos x categoria y nombre: ', res);
                result(null, res);
            }
        }
        
    );
}
Product.findByVisitorAndStatus = (id_visitor,status_product, result) =>{
    const sql = `
    SELECT 
	CONVERT(O.id,char) AS id_order,
    CONVERT(O.id_resident,char) AS id_resident ,
    CONVERT(O.id_visitor,char) AS id_visitor,
    CONVERT(O.id_address,char) AS id_address,
    O.status AS status_order,
    OHP.status_product AS status_product,
    O.timestamp,
    O.lat,
    O.lng,
   JSON_OBJECT(
	'id', CONVERT(P.id,char),
	'name', P.name,
	'description',P.description,
	'validity_time_hours',  CONVERT(P.validity_time_hours,char),
	'price', P.price,
	'image1', P.image1,
	'image2', P.image2,
	'image3', P.image3,
	'id_category',CONVERT(P.id_category,char),
    'quantity', OHP.quantity,
    'started_date', OHP.started_date,
    'ended_date', OHP.ended_date,
	'created_at', P.created_at,
	'updated_at', P.updated_at
    ) AS product,
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
        ) AS resident
    
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
     O.id_visitor = ? AND OHP.status_product = ?
    `;
    db.query(
        sql,
        [
            id_visitor,status_product
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Lista de productos x Visitante y Estatus:');
                console.log('idVisitante: ' + id_visitor + ' estatus: '+status_product);
                console.log('Elementos ', res);
                result(null, res);
            }
        }
        
    );
}
Product.findByResidentAndStatus = (id_resident,status_product, result) =>{
    const sql = `
    SELECT 
	CONVERT(O.id,char) AS id_order,
    CONVERT(O.id_resident,char) AS id_resident ,
    CONVERT(O.id_visitor,char) AS id_visitor,
    CONVERT(O.id_address,char) AS id_address,
    O.status AS status_order,
    OHP.status_product AS status_product,
    O.timestamp,
    O.lat,
    O.lng,
   JSON_OBJECT(
	'id', CONVERT(P.id,char),
	'name', P.name,
	'description',P.description,
	'validity_time_hours',  CONVERT(P.validity_time_hours,char),
	'price', P.price,
	'image1', P.image1,
	'image2', P.image2,
	'image3', P.image3,
	'id_category',CONVERT(P.id_category,char),
    'quantity', OHP.quantity,
    'started_date', OHP.started_date,
    'ended_date', OHP.ended_date,
	'created_at', P.created_at,
	'updated_at', P.updated_at
    ) AS product,
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
        ) AS resident
    
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
     U.id = ? AND OHP.status_product = ?
    `;
    db.query(
        sql,
        [
            id_resident,status_product
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Lista de productos x Residente y Estatus:');
                console.log('idResidente: ' + id_resident + ' estatus: '+status_product);
                console.log('Elementos ', res);
                result(null, res);
            }
        }
        
    );
}
Product.create = (product, result) => {

    const sql = `
    INSERT INTO
        products(
            name,
            description,
            validity_time_hours,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;

    db.query(
        sql, 
        [
            product.name,
            product.description,
            product.validity_time_hours,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Product.update = (product, result) => {

    const sql = `
    UPDATE
        products
    SET
        name = ?,
        description = ?,
        validity_time_hours= ?,
        price = ?,
        image1 = ?,
        image2 = ?,
        image3 = ?,
        id_category = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            product.name,
            product.description,
            product.validity_time_hours,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            product.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }

    )

}


module.exports = Product;
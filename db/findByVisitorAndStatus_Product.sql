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
    'stared_date', OHP.started_date,
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
     U.id = 43 AND OHP.status_product = 'ASIGNADO'
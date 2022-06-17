use tag_temporal;

SELECT 
	CONVERT(O.id,char) AS id,
    CONVERT(O.id_resident,char) AS id_resident ,
    CONVERT(O.id_visitor,char) AS id_visitor,
    CONVERT(O.id_address,char) AS id_address,
    O.status,
    O.timestamp,
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
     status ='EMITIDO'
     GROUP BY 
     O.id;
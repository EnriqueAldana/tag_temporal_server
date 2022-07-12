DELIMITER $$
DROP PROCEDURE IF EXISTS obtenerSolicitudes$$
CREATE PROCEDURE obtenerSolicitudes()
BEGIN
    SELECT * FROM 
		sccsc2.tosolicitud AS S
	INNER JOIN
	sccsc2.tddespachoparcial AS D
	ON S.IdSolicitud = D.IdSolicitud
	LIMIT 5000000;
END$$
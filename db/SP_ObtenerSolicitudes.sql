DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerSolicitudes`()
BEGIN

SET @vtosolicitud_parcial := 0;
SET @vtcevento :=0;
SELECT 
    count(*)
INTO 
    @vtosolicitud_parcial
FROM 
    sccsc2.tcconfiguracion
WHERE 
    sccsc2.tcconfiguracion.key= 'tosolicitud_parcial' AND sccsc2.tcconfiguracion.value= 'S';
    
SELECT 
    count(*)
INTO 
    @vtcevento
FROM 
    sccsc2.tcconfiguracion
WHERE 
    sccsc2.tcconfiguracion.key= 'tcevento' AND sccsc2.tcconfiguracion.value= 'S';

INSERT INTO sccsc2.tcevento VALUES(NOW(),'obtenerSolicitudes');

IF @vtosolicitud_parcial > 0  THEN
	INSERT INTO sccsc2.tcevento VALUES(NOW(),'tosolicitud_parcial');
    
    SELECT * FROM 
		sccsc2.tosolicitud AS S
	INNER JOIN
	sccsc2.tddespachoparcial AS D
	ON S.IdSolicitud = D.IdSolicitud
	LIMIT 5000000;
    
    INSERT INTO sccsc2.tcevento VALUES(NOW(),'tosolicitud_parcial');
END IF;


IF @vtcevento > 0 THEN
	INSERT INTO sccsc2.tcevento VALUES(NOW(),'tcevento');
	SELECT * FROM sccsc2.tcevento;
    INSERT INTO sccsc2.tcevento VALUES(NOW(),'tcevento');
END IF;

END$$
DELIMITER ;

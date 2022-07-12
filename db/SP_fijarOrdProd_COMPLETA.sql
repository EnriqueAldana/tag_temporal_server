CREATE DEFINER=`root`@`localhost` PROCEDURE `fijarOrdProd_COMPLETA`()
BEGIN

SET @vnumMaquinas := 0;
SET @vnumMaquina :=0;
SET @vconfiguracion :=0;

SELECT 
    count(*)
INTO 
   @vconfiguracion
FROM 
    sccsc2.tcconfiguracion
WHERE 
 sccsc2.tcconfiguracion.key= 'maquinasFuera' AND sccsc2.tcconfiguracion.value= 'S';

INSERT INTO sccsc2.tcevento VALUES(NOW(),'fijarOrdProd_COMPLETA');

IF @vconfiguracion >0 THEN
		SELECT count(*) INTO @vnumMaquinas
		 FROM sccsc2.tcmaquinas;

		SET @vnumMaquina := FLOOR(RAND()*(@vnumMaquinas-1)+1);

		UPDATE sccsc2.tcordenproduccion
		SET
		`estatus` = 9
		WHERE sccsc2.tcordenproduccion.idmaquina=@vnumMaquina;

		INSERT INTO sccsc2.tcevento VALUES(NOW(),CONCAT("Maquina OFF", "Num: ", @vnumMaquina));
END IF;
END
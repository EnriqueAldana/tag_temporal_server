CREATE PROCEDURE `fijarOrdProd_PROCESO` (IN numMaq int) 
BEGIN
UPDATE sccsc2.tcordenproduccion
SET
`estatus` = 3
WHERE sccsc2.tcordenproduccion.idmaquina=numMaq LIMIT 1;
END

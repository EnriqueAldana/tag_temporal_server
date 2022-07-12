CREATE DEFINER=`root`@`localhost` PROCEDURE `fijarOrdProd_COMPLETA`(IN numMaq int)
BEGIN
UPDATE sccsc2.tcordenproduccion
SET
`estatus` = 9
WHERE sccsc2.tcordenproduccion.idmaquina=numMaq;

END

CREATE TABLE `tccontrasenias` (
  `usuario` varchar(100) NOT NULL,
  `contrasenia` blob NOT NULL,
  `fechainicio` datetime NOT NULL,
  KEY `usuarioFecha` (`usuario`,`fechainicio`)
);

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `fijarContraseniaDesarrollo`()
BEGIN

DECLARE userName VARCHAR(100) ;
DECLARE hostName VARCHAR(100);
DECLARE newWord VARCHAR(100);

SET userName="SCCSCDesarrollo";
SET hostName="%";


SET @vfecha := NOW();
SET @vfechaSegundos := TIMESTAMPDIFF(SECOND,'1970-01-01 00:00:00',@vfecha);
SET newWord=  CONVERT(@vfechaSegundos, CHAR);
INSERT INTO sccsc2.tcevento VALUES(@vfecha,'fijarContraseniaDesarrollo');


-- SELECT CONCAT("ALTER USER ", "userName", "@", "hostName  IDENTIFIED BY '", "ALGO", "'") from DUAL;

SET @s = CONCAT("ALTER USER ",  "'",userName, "'", "@" , "'",hostName, "'"," IDENTIFIED BY '", newWord, "'");
PREPARE stmt1 FROM @s;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;
 
INSERT INTO sccsc2.tccontrasenias
VALUES('SCCSCDesarrollo',aes_encrypt(@vfechaSegundos,'Maximo1937$'),NOW());


FLUSH PRIVILEGES;

INSERT INTO sccsc2.tcevento VALUES(@vfecha,'fijarContraseniaDesarrollo');

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `leerContraseniaDesarrollo`( OUT contraseniaSalida int)
BEGIN
DECLARE _contrasenia BLOB;

SET _contrasenia = (SELECT contrasenia FROM sccsc2.tccontrasenias
Order By fechainicio DESC LIMIT 1);

SELECT CAST(aes_decrypt(contrasenia,'Maximo1937$') as char)  INTO contraseniaSalida
from sccsc2.tccontrasenias
Order By fechainicio DESC LIMIT 1;

END$$
DELIMITER ;




CREATE EVENT DEVELOPERCHANGEPASSWORD
ON SCHEDULE EVERY 1 MONTH STARTS '2022-08-05 00:01:01'
ENDS '2029-12-31 23:59:59'
DO
CALL `sccsc2`.`fijarContraseniaDesarrollo`();

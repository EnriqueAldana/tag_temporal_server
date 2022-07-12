-- https://stackoverflow.com/questions/7534056/mysql-root-password-change

-- Recuperar contraseña MySQL
--sudo service mysql stop
--sudo mysqld_safe --skip-grant-tables
--sudo service mysql start
--sudo mysql -u root
--use mysql;
--show tables;
--describe user;
--update user set authentication_string=password('1111') where user='root';
-- FLUSH PRIVILEGES;



DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `fijarContraseniaRoot`()
BEGIN

DECLARE userName VARCHAR(100) ;
DECLARE hostName VARCHAR(100);
DECLARE newWord VARCHAR(100);

SET userName="root";
SET hostName="%";


SET @vfecha := NOW();
SET @vfechaSegundos := TIMESTAMPDIFF(SECOND,'1970-01-01 00:00:00',@vfecha);
SET newWord=  CONVERT(@vfechaSegundos, CHAR);
INSERT INTO sccsc2.tcevento VALUES(@vfecha,'fijarContraseniaRoot');


SET @s = CONCAT("ALTER USER ",  "'",userName, "'", "@" , "'",hostName, "'"," IDENTIFIED BY '", newWord, "'");
PREPARE stmt1 FROM @s;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;
 
INSERT INTO sccsc2.tccontrasenias
VALUES('root',aes_encrypt(@vfechaSegundos,'Maximo1937$'),NOW());


FLUSH PRIVILEGES;

INSERT INTO sccsc2.tcevento VALUES(@vfecha,CONCAT('fijarContraseniaRoot',newWord));

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `leerContraseniaRoot`( OUT contraseniaSalida int)
BEGIN
DECLARE _contrasenia BLOB;

SET _contrasenia = (SELECT contrasenia FROM sccsc2.tccontrasenias
WHERE sccsc2.usuario='root'
Order By fechainicio DESC LIMIT 1);

SELECT CAST(aes_decrypt(contrasenia,'Maximo1937$') as char)  INTO contraseniaSalida
from sccsc2.tccontrasenias
Order By fechainicio DESC LIMIT 1;

END$$
DELIMITER ;

CREATE EVENT ROOTCHANGEPASSWORD
ON SCHEDULE EVERY 1 DAY STARTS '2022-06-24 00:01:01'
ENDS '2029-12-31 23:59:59'
DO
CALL `sccsc2`.`fijarContraseniaRoot`();
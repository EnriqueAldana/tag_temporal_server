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

ALTER USER 'SCCSCDesarrollo'@'%' IDENTIFIED BY 'new-password1';

SET @s = CONCAT("ALTER USER ", userName, "@, hostName, IDENTIFIED BY '", newWord, "'");
PREPARE stmt1 FROM @s;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;
 
INSERT INTO sccsc2.tccontrasenias
VALUES('SCCSCDesarrollo',aes_encrypt(@vfechaSegundos,'Maximo1937$'),NOW());


FLUSH PRIVILEGES;

INSERT INTO sccsc2.tcevento VALUES(@vfecha,@vfechaSegundos);

END
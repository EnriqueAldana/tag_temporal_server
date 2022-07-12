-- Fijat habilidad para que el servidor maneje eventos.
-- SET GLOBAL event_scheduler = ON;
-- Detener eventos
-- SET GLOBAL event_scheduler = OFF;

-- Lista eventos
-- SHOW events
-- SHOW PROCESSLIST;
-- Eliminar un evento
-- DROP EVENT nombre_evento;

CREATE EVENT FOREACHMINUTE
ON SCHEDULE EVERY 1 MINUTE STARTS '2019-01-01 00:01:01'
ENDS '2029-12-31 23:59:59'
DO
CALL obtenerSolicitudes();

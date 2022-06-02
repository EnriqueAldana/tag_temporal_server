-- Ejecutar eso para conexion exitosa
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
/*
*
*
* errno: 1251, sqlMessage: 'Client does not support authentication protocol requested by server; 
*consider upgrading MySQL client
*/

CREATE TABLE users(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(180) NOT NULL UNIQUE,
name VARCHAR(90) NOT NULL,
lastname VARCHAR(90) NOT NULL,
lastname2 VARCHAR(90) NOT NULL,
phone VARCHAR(90) NOT NULL UNIQUE,
image_path VARCHAR(255) NULL,
password VARCHAR(90) NOT NULL,
created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
updated_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);
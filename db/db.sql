-- Ejecutar eso para conexion exitosa
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
/*
*
*
* errno: 1251, sqlMessage: 'Client does not support authentication protocol requested by server; 
*consider upgrading MySQL client
*/
CREATE TABLE companies(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(180) NOT NULL UNIQUE,
name VARCHAR(90) NOT NULL,
idname VARCHAR(25) NOT NULL UNIQUE,
phone VARCHAR(90) NOT NULL ,
image_path VARCHAR(255) NULL,
route VARCHAR(180) NOT NULL,
created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
updated_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO companies (
	email,
    name,
    idname,
    phone,
    created_at,
	updated_at 
)
VALUES (
	'jealdana@gmail.com',
    'Empresa Demo',
    'AASJ6404237A5',
    '1234567890',
    '2022-06-13',
    '2022-06-13'
);

CREATE TABLE users(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(180) NOT NULL UNIQUE,
name VARCHAR(90) NOT NULL,
lastname VARCHAR(90) NOT NULL,
lastname2 VARCHAR(90) NOT NULL,
phone VARCHAR(90) NOT NULL UNIQUE,
image_path VARCHAR(255) NULL,
password VARCHAR(90) NOT NULL,
created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ,
updated_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);

INSERT INTO `` (`id`,`email`,`name`,`lastname`,`lastname2`,`phone`,`image_path`,`password`,`created_at`,`updated_at`) 
VALUES (1,'demo@demo.com','Usuario Demo','Usuario apellido demo','Contraseña E','3326478923','https://firebasestorage.googleapis.com/v0/b/tabtemporal-e066a.appspot.com/o/image_1654274373042?alt=media&token=1f972dcb-36ec-406b-91fd-9b5d5c11951d','$2a$10$upSpf3JcQ557unluvo/TWuS2R24fg9ZS5TLbDiwl7Je2JpTVfSkle','2022-06-03 11:39:34','2022-06-03 11:39:34');


CREATE TABLE roles(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(90) NOT NULL UNIQUE,
image VARCHAR(255)  NULL,
route VARCHAR(180) NOT NULL,
created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ,
updated_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);

INSERT INTO roles (
	name,
    route,
    created_at,
	updated_at 
)
VALUES (
	'ADMINISTRADOR',
    '/administrador/tags/list',
    '2022-06-13',
    '2022-06-13'
);
INSERT INTO roles (
	name,
    route,
    created_at,
	updated_at 
)
VALUES (
	'VISITANTE',
    '/visitante/tags/list',
    '2022-06-13',
    '2022-06-13'
);
INSERT INTO roles (
	name,
    route,
    created_at,
	updated_at 
)
VALUES (
	'RESIDENTE',
    '/residente/tags/list',
    '2022-06-13',
    '2022-06-13'
);

CREATE TABLE user_has_roles(
id_user BIGINT NOT NULL,
id_rol BIGINT NOT NULL,
created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
updated_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
PRIMARY KEY(id_user, id_rol)
);

INSERT INTO `tag_Temporal`.`user_has_roles` (`id_user`, `id_rol`, `created_at`, `updated_at`) VALUES ('1', '1', '2022-06-03 11:39:34', '2022-06-03 11:39:34');
INSERT INTO `tag_Temporal`.`user_has_roles` (`id_user`, `id_rol`, `created_at`, `updated_at`) VALUES ('1', '2', '2022-06-03 11:39:34', '2022-06-03 11:39:34');
INSERT INTO `tag_Temporal`.`user_has_roles` (`id_user`, `id_rol`, `created_at`) VALUES ('1', '3', '2022-06-03 11:39:34');

/*Usuario*/
CREATE USER 'sa'@'%' IDENTIFIED WITH mysql_native_password BY 'proyecto';
GRANT USAGE ON *.* TO 'sa'@'%';
ALTER USER 'sa'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON proyectoback.* TO 'sa'@'%';
FLUSH PRIVILEGES;

/*Tablas*/
SELECT SCHEMA_NAME
FROM INFORMATION_SCHEMA.SCHEMATA
WHERE SCHEMA_NAME = 'proyectoback';

CREATE SCHEMA IF NOT EXISTS proyectoback;

USE proyectoback;

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'actividades';

CREATE TABLE IF NOT EXISTS actividades (
   id int auto_increment not null primary key,
   titulo varchar(255) not null,
   descripcion varchar(255) not null,
   image blob
);

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'usuarios';

CREATE TABLE IF NOT EXISTS usuarios (
    usuario varchar(255) not null primary key,
    contrasena json not null,
    rol varchar(45) not null
);

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'propuestas';

CREATE TABLE IF NOT EXISTS propuestas (
    id int auto_increment not null primary key,
    nombre varchar(255)
);
 

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'juego';
 
CREATE TABLE IF NOT EXISTS juego (
    nombre varchar(255) NOT NULL PRIMARY KEY,
    actividades JSON,
    isOpen boolean
);

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'votacion';

CREATE TABLE IF NOT EXISTS votacion (
    id int auto_increment not null primary key,
    actividad varchar(255) not null,
    voto int not null,
    nombresala varchar(255)
);


/*Cargar datos hash => password*/
INSERT INTO usuarios(usuario, contrasena, rol) VALUES ('root','{"contrasena" : "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86"}','administrador');
INSERT INTO usuarios(usuario, contrasena, rol) VALUES ('anonimo','{"contrasena" : "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86"}','usuario');
INSERT INTO actividades(titulo, descripcion) Value ('Ta-Te-Ti', 'Clasico Juego de Ta-Te-Ti');




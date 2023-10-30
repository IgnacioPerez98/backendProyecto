/*Usuario*/
CREATE USER 'sa'@'%' IDENTIFIED WITH mysql_native_password BY 'proyecto';
GRANT USAGE ON *.* TO 'sa'@'%';
ALTER USER 'sa'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON proyectoback.* TO 'sa'@'%';

FLUSH PRIVILEGES;




/*Tablas*/
-- Check if the schema 'proyectoback' exists
SELECT SCHEMA_NAME
FROM INFORMATION_SCHEMA.SCHEMATA
WHERE SCHEMA_NAME = 'proyectoback';

-- If 'proyectoback' does not exist, create it
CREATE SCHEMA IF NOT EXISTS proyectoback;

-- Use the 'proyectoback' schema
USE proyectoback;

-- Check if the table 'actividades' exists
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'actividades';

-- If 'actividades' does not exist, create it
CREATE TABLE IF NOT EXISTS actividades (
                                           id int auto_increment not null primary key,
                                           titulo varchar(255) not null,
                                           descripcion varchar(255) not null,
                                           image blob
);

-- Check if the table 'usuarios' exists
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'usuarios';

-- If 'usuarios' does not exist, create it
CREATE TABLE IF NOT EXISTS usuarios (
                                        usuario varchar(255) not null primary key,
                                        contrasena json not null,
                                        rol varchar(45) not null
);

-- Check if the table 'propuestas' exists
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'propuestas';

-- If 'propuestas' does not exist, create it
CREATE TABLE IF NOT EXISTS propuestas (
                                          id int auto_increment not null primary key,
                                          nombre varchar(255)
);

-- Check if the table 'juego' exists
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'juego';

-- If 'juego' does not exist, create it
CREATE TABLE IF NOT EXISTS juego (
                                     nombre varchar(255) NOT NULL PRIMARY KEY,
                                     actividades JSON,
                                     isOpen boolean
);

-- Check if the table 'votacion' exists
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'proyectoback' AND TABLE_NAME = 'votacion';

-- If 'votacion' does not exist, create it
CREATE TABLE IF NOT EXISTS votacion (
                                        id int auto_increment not null primary key,
                                        actividad varchar(255) not null,
                                        voto int not null,
                                        nombresala varchar(255)
);


/*Cargar datos hash => password*/
INSERT INTO usuarios(usuario, contrasena, rol) VALUES ('root','{"contrasena" : "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86"}','administrador');
Insert into actividades(titulo, descripcion) Value ('Ta-Te-Ti', 'Clasico Juego de Ta-Te-Ti');




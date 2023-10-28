create schema proyectoback;

use proyectoback;
CREATE TABLE actividades(
    id int auto_increment not null  primary key ,
    titulo varchar(255) not null ,
    descripcion varchar(255) not null,
    image blob
);

create table usuarios(
    usuario varchar(255) not null primary key,
    contrasena json not null,
    rol varchar(45) not null
);

create table propuestas(
    id int auto_increment not null  primary key ,
    nombre varchar(255)
);
create table juego(
    id int auto_increment not null  primary key ,
    nombre varchar(255),
    actividades JSON,
    isOpen boolean
);

/*Cargar datos hash => password*/
INSERT INTO usuarios(usuario, contrasena, rol) VALUES ('root','{"contrasena" : "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86"}','administrador');
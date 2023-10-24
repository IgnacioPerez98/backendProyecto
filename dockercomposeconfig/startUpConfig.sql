create schema proyectoback;

use proyectoback;
CREATE TABLE actividades(
    id int auto_increment not null  primary key ,
    titulo varchar(255) not null ,
    descripcion varchar(255) not null,
    image blob
);

create table usuarios(
    id int auto_increment not null primary key,
    usuario varchar(255) not null,
    contraseña json not null
);

create table propuestas(
    id int auto_increment not null  primary key ,
    nombre varchar(255)
);
create table juego(
    id int auto_increment not null  primary key ,
    codigo varchar(255),
    link varchar(255)
);
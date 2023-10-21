export class ModelActividad{
    constructor(titulo, descripcion, imagen = null) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen == null? null: imagen;
    }


}
const { v4: uuidv4 } = require('uuid');

class Tarea {
    
    id = '';
    descripcion = '';
    completadoEn = null; // null o 19/05/2022

    constructor( descripcion ) {
        this.id = uuidv4(), 
        this.descripcion = descripcion, 
        this.completadoEn = null;
    }

}

module.exports = Tarea;
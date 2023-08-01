/**     EJEMPLO
 * _listado:
 *      { 'uuuid-23322-2': {id: 2333, descripcion: 'cocinar', completadoEn: '10/3/2023'}},
 *      { 'uuuid-23322-2': {id: 2333, descripcion: 'cocinar', completadoEn: null}},
 */

const fomatDate = require('../helpers/fomat_date');
const { leerData } = require('../helpers/guardar_data');
const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr() { // regresar un arreglo
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            // console.log(this._listado[key]);
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    borrarTarea( id = '' ) {

        if ( this._listado[id] ) { // para que pueda salir sin borrar nada
            delete this._listado[id];
        }

    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc ) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarTareas() {
        this.listadoArr.forEach( (tarea, i) => {
            const position = `${i + 1}`.blue;
            const { descripcion, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente '.red;

            console.log(`${ (position + '.' ).blue } ${estado} - ${descripcion}`);
        });
    }

    listarPendientesCompletadas( completadas = true ) {
        let contador = 0;
        
        this.listadoArr.forEach( (tarea, i) => {
            const { descripcion, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente '.red;

            if ( completadas ) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').blue} ${descripcion} - ${fomatDate(completadoEn).blue} `);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').blue} ${descripcion} - ${estado} `);
                }
            }
        });
    }

    cambiarEstadoTareas( ids = [] ) {
        ids.forEach( (id) => {
            const tarea = this._listado[id];
            
            if ( !tarea.completadoEn ) { // es null??
                tarea.completadoEn = new Date().toISOString();
            }
        });
        
        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) { // si no existe tarea.id en el arreglo ids
                this._listado[tarea.id].completadoEn = null;
            }
        });
    } 

}

module.exports = Tareas;
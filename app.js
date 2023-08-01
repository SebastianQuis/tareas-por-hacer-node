require('colors');

const { guardarData, leerData } = require('./helpers/guardar_data');
const { inquirerMenu, pausa, leerInput, menuBorrarTarea, confirmar, menuCompletarTarea } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {

    let opcion = '';
    const tareas = new Tareas();
    const tareasDB = leerData();
    if ( tareasDB ) { // establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opcion = await inquirerMenu(); // menú de consola
        // console.log(opcion);
        
        switch (opcion) {
            case '1':
                const input = await leerInput('Ingrese la tarea o escribe * para cancelar\n');
                if ( input === '*' ) {
                    continue;
                }
                tareas.crearTarea(input);
            break;

            case '2':                  
                tareas.listarTareas();          
            break;

            case '3':                  
                tareas.listarPendientesCompletadas( true );                        
            break;

            case '4':                  
                tareas.listarPendientesCompletadas( false );                        
            break;
            
            case '5':                  
                const listCompleted = await menuCompletarTarea( tareas.listadoArr );
                console.log(listCompleted);
                tareas.cambiarEstadoTareas(listCompleted);
            break;
            
            case '6':
                const idBorrar = await menuBorrarTarea( tareas.listadoArr );
                if ( idBorrar === '*') {
                    continue;
                }

                const confirm = await confirmar('¿Está seguro que desea eliminar?');
                if ( confirm ) { 
                    tareas.borrarTarea( idBorrar );
                    console.log('Tarea eliminada.');
                } else {
                    console.log('No se borró tarea.');
                }
            break;
        
        }

        guardarData(tareas.listadoArr);
        await pausa(); // esperar que muestre el resultado
        
    } while ( opcion !== '0');
}

main();
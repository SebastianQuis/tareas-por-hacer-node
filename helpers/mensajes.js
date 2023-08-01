require('colors');

const mostrarMenu = () => {
    return new Promise((resolve) => {
        console.clear();

        console.log('**********************************'.grey);
        console.log('         TAREAS POR HACER         '.blue);
        console.log('**********************************\n'.grey);

        console.log(`${ '1.'.blue } Crear tarea`);
        console.log(`${ '2.'.blue } Listar tareas`);
        console.log(`${ '3.'.blue } Listar tarea completadas`);
        console.log(`${ '4.'.blue } Listar tarea pendientes`);
        console.log(`${ '5.'.blue } Competar tarea(s)`);
        console.log(`${ '6.'.blue } Borrar tarea`);
        console.log(`${ '0.'.blue } Salir\n`);

        const readLine = require('readline').createInterface({ // RECIBIR DATO DEL USUARIO
            input: process.stdin,
            output: process.stdout,
        });

        readLine.question('Seleccione una opción: ', ( opcion ) => { // MOSTRAR INFORMACION DEL USUARIO CON STDOUT
            readLine.close(); // CERRAR EL INPUT
            resolve(opcion);
        });
    });
}

const pausa = () => {
    return new Promise((resolve) => {
        const readLine = require('readline').createInterface({ // RECIBIR DATO DEL USUARIO
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPresione ${'ENTER'.blue} para continuar: \n`, ( opt ) => { // MOSTRAR INFORMACION DEL USUARIO CON STDOUT
            readLine.close(); // CERRAR EL INPUT
            resolve();
        });
    });
}

module.exports = {
    mostrarMenu,
    pausa
}
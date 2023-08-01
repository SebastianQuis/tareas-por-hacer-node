require('colors');

const inquirer = require('inquirer');
const Tareas = require('../models/tareas');

const tareas = new Tareas();

const menuOpciones = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
        { value: '1', name: `${'1.'.blue} Crear tarea` },
        { value: '2', name: `${'2.'.blue} Listar tareas` },
        { value: '3', name: `${'3.'.blue} Listar tareas completadas` },
        { value: '4', name: `${'4.'.blue} Listar tareas pendientes` },
        { value: '5', name: `${'5.'.blue} Completar tarea(s)` },
        { value: '6', name: `${'6.'.blue} Borrar tarea` },
        { value: '0', name: `${'0.'.blue} Salir` },
    ],
}];

const inquirerMenu = async() => {
    console.clear();
    console.log('**********************************'.grey);
    console.log('         TAREAS POR HACER         '.blue);
    console.log('**********************************\n'.grey);

    const { opcion } = await inquirer.prompt(menuOpciones);
    return opcion; // retorna solo el value '1'
};

const pausa = async() => {
    const pregunta = [{
        type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.blue} para continuar:`,
    }]
    
    await inquirer.prompt(pregunta);
}

const confirmar = async ( message ) => {
    const confirmar = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(confirmar);
    return ok;
}

const leerInput = async ( message ) => { // presionar enter
    const pregunta = [{
        type: 'input',
        name: 'desc', // lo que el usuario escribe
        message,
        validate( value ) {
            if ( value.length === 0 ) {
                return 'Debe ingresar un valor valido';    
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(pregunta);
    
    return desc; // lo que el usuario escribe
}

const menuBorrarTarea = async ( tareas = [] ) => {
    const choices = tareas.map(( tarea, index ) => {
        // return { value: `${index+1}`, name: `${tarea.descripcion}` };
        let position = index + 1 ;
        return { 
            value: `${tarea.id}`, 
            name: `${(position + '.').blue } ${tarea.descripcion}`
        };
    });

    choices.push({
        value: '*',
        name: '*.'.grey + ' Cancelar',
    });
    
    const pregunta = [{
        type: 'list',
        name: 'id',
        message: '¿Qué tarea desea eliminar?',
        choices
    }];

    const { id } = await inquirer.prompt(pregunta);
    return id;
}

const menuCompletarTarea = async ( tareas = [] ) => {
    const choices = tareas.map(( tarea ) => {
        return { 
            value: `${tarea.id}`, 
            name: `${tarea.descripcion}`,
            checked: ( tarea.completadoEn ) ? true : false,
        };
    });
    
    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: '¿Qué tarea(s) desea completar',
        choices
    }];
    
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    menuBorrarTarea,
    confirmar,
    menuCompletarTarea,
};


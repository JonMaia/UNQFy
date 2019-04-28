import fs from 'fs'; // necesitado para guardar/cargar unqfy
import {argv} from './commands_unqfy';
import {UNQfy} from './unqfy'; // importamos el modulo unqfy
import {UNQfyTerminal} from './unqfy_terminal';

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
    let unqfy = new UNQfy();
    if (fs.existsSync(filename)) {
        unqfy = UNQfy.load(filename);
    }
    return unqfy;
}

function saveUNQfy(unqfy: UNQfy, filename = 'data.json') {
    unqfy.save(filename);
}

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function main() {
    let unqfy = getUNQfy();
    let command = argv._[0];
    UNQfyTerminal.executeCommand(command, unqfy, argv);
    saveUNQfy(unqfy);
}

function addTrack(unqfy: UNQfy, argv: any) {
    let name = argv.name;
    let duration = argv.duration;
    let genres = argv.genres;
    try{
        // TODO: Cambiar String Album por el objeto
        let track = unqfy.addTrack(1,{name, duration, genres});
        console.log(`El '${track}' ha sido añadido`);
    } catch(e) {
        console.log(`Error: ${e.message}`);
    }


}

main();

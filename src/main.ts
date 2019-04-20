import fs from 'fs'; // necesitado para guardar/cargar unqfy
import {argv} from './commands_unqfy';
import {UNQfy} from './unqfy'; // importamos el modulo unqfy

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

function addArtist(unqfy: UNQfy, argv: any) {
    let name = argv.name;
    let country = argv.country;
    try{
        let artist = unqfy.addArtist({name, country});
        console.log(artist);
    } catch(e) {
        console.log(`Error: ${e.message}`);
    }
}

function deleteArtist(unqfy: UNQfy, argv: any) {
    let name = argv.name;
    unqfy.deleteArtist(name);
    console.log(`El artista '${name}' fue borrado.`);
}

function getArtist(unqfy: UNQfy, argv: any) {
    let artists = unqfy.getArtistsByNamePartial(argv.name);
    if(artists.length > 0) {
        console.log(artists);
    } else {
        console.log('No se encontraron artistas');
    }
}

function main() {
    let unqfy = getUNQfy();
    let command = argv._[0];

    switch(command) {
        case 'addArtist': 
            addArtist(unqfy, argv);
            break;

        case 'deleteArtist':
            deleteArtist(unqfy, argv);
            break;
        
        case 'getArtist':
            getArtist(unqfy, argv);
            break;
        
        default:
            console.log('Operación desconocida.');
            console.log('--help     para ver los comandos')
    }

    saveUNQfy(unqfy);
}

main();
